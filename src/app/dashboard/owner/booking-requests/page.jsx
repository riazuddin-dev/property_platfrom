"use client";

import { useEffect, useState } from "react";
import { getBookingRequests, updateBookingStatus } from "@/services/bookingApi";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { MapPin, Calendar } from "lucide-react";

export default function BookingRequests() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getBookingRequests(session.user.email); // ← Fixed: email pass kora hoyeche
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load booking requests:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [session]);

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: status === "approved" ? "Approve Booking?" : "Reject Booking?",
      icon: status === "approved" ? "success" : "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await updateBookingStatus(id, status);
        setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        Swal.fire("Success!", `Booking ${status}`, "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Booking Requests</h1>
        <p className="text-slate-400 mt-2">Review and manage tenant requests</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl py-24 text-center border border-slate-700">
          <div className="mx-auto w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 text-6xl">
            📅
          </div>
          <h3 className="text-3xl font-semibold text-white">No Pending Requests</h3>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            New booking requests will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-teal-500 transition"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-72 h-52 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={booking.propertyImage}
                    alt={booking.propertyTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-2xl font-semibold">{booking.propertyTitle}</h3>
                    <span className={`px-6 py-2 rounded-full text-sm font-medium capitalize
                      ${booking.status === 'approved' ? 'bg-emerald-500 text-white' : 
                        booking.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {booking.status || "Pending"}
                    </span>
                  </div>

                  <p className="text-slate-400 mt-2">Tenant: {booking.tenantName}</p>
                  <p className="text-slate-400">Email: {booking.tenantEmail}</p>

                  <div className="mt-6 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-slate-400">Monthly Rent</p>
                      <p className="text-3xl font-bold text-teal-400">৳{booking.rent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Requested On</p>
                      <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={() => handleStatusUpdate(booking._id, "approved")}
                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-semibold transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, "rejected")}
                        className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}