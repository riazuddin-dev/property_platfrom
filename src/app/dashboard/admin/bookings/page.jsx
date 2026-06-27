"use client";

import { useEffect, useState } from "react";
import { getAllBookings } from "@/services/bookingApi";

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-2">All Bookings</h1>
      <p className="text-slate-400 mb-8">Monitor all booking activities across the platform</p>

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/70">
                <th className="text-left p-6">Tenant</th>
                <th className="text-left p-6">Property</th>
                <th className="text-left p-6">Owner</th>
                <th className="text-left p-6">Amount</th>
                <th className="text-center p-6">Status</th>
                <th className="text-left p-6">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-6">
                      <p className="font-medium">{booking.tenantName}</p>
                      <p className="text-sm text-slate-400">{booking.tenantEmail}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-medium">{booking.propertyTitle}</p>
                    </td>
                    <td className="p-6 text-slate-300">{booking.ownerEmail}</td>
                    <td className="p-6 font-semibold">৳{booking.rent}</td>
                    <td className="p-6 text-center">
                      <span className={`px-6 py-2 rounded-full text-sm font-medium capitalize
                        ${booking.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                          booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {booking.status || "pending"}
                      </span>
                    </td>
                    <td className="p-6 text-slate-400">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-slate-400">
                    No bookings found yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}