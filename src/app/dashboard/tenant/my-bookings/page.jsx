// src/app/dashboard/tenant/my-bookings/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getMyBookings } from "@/services/bookingApi";
import { Calendar, MapPin, DollarSign } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

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
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <p className="text-slate-400 mt-2">Track all your rental reservations</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-20 text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h3 className="text-3xl font-semibold">No Bookings Yet</h3>
          <p className="text-slate-400 mt-3">Start exploring properties and make your first booking</p>
          <a href="/properties" className="btn bg-teal-500 hover:bg-teal-600 text-white mt-8 px-10 py-4 rounded-2xl inline-block">
            Browse Properties
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row gap-8 border border-slate-700 hover:border-teal-500 transition"
            >
              <div className="md:w-72 h-56 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-semibold">{booking.propertyTitle}</h3>
                  <span className={`px-6 py-2 rounded-full text-sm font-medium capitalize
                    ${booking.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                      booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {booking.status || "Pending"}
                  </span>
                </div>

                <p className="flex items-center gap-2 text-slate-400 mt-3">
                  <MapPin size={18} /> {booking.location}
                </p>

                <div className="mt-6 flex items-center gap-8">
                  <div>
                    <p className="text-slate-400 text-sm">Monthly Rent</p>
                    <p className="text-3xl font-bold text-teal-400">৳{booking.rent}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Booked On</p>
                    <p className="font-medium">{new Date(booking.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700 flex gap-4">
                  {booking.status === "approved" && (
                    <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white">View Receipt</button>
                  )}
                  <button className="btn btn-outline">Contact Owner</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}