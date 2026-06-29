"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth } from "@/utils/api";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={18} />;
      case "pending":
        return <Clock size={18} />;
      case "rejected":
        return <XCircle size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Bookings</h1>
        <p className="text-slate-400">View and manage your property bookings</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl"
        >
          <div className="inline-flex p-6 bg-slate-800/50 rounded-full mb-6">
            <Home className="text-slate-500" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No bookings yet</h3>
          <p className="text-slate-400 mb-6">Start exploring properties and book your dream home</p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Home size={18} />
            Browse Properties
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Property Info */}
                <div className="flex gap-4">
                  <img
                    src={booking.propertyImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"}
                    alt={booking.propertyTitle}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{booking.propertyTitle}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Move-in: {new Date(booking.moveInDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-teal-400 font-bold mt-2">৳{booking.amount?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="font-semibold capitalize">{booking.status}</span>
                  </div>
                  
                  {booking.status === "approved" && (
                    <Link
                      href={`/properties/${booking.propertyId}`}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition"
                    >
                      View Property
                    </Link>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-white/10 grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">Contact Number</p>
                  <p className="text-white font-medium">{booking.contactNumber}</p>
                </div>
                {booking.additionalNotes && (
                  <div className="md:col-span-2">
                    <p className="text-slate-400 mb-1">Notes</p>
                    <p className="text-white">{booking.additionalNotes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}