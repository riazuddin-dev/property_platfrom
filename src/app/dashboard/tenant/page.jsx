// src/app/dashboard/tenant/page.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Heart, Clock, CheckCircle2, MapPin, Home as HomeIcon, TrendingUp } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";
import { getMyBookings } from "@/services/bookingApi";
import Link from "next/link";

export default function TenantDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, bookingsData] = await Promise.all([
          getDashboardStats(),
          getMyBookings(),
        ]);
        setStats(statsData);
        setBookings(bookingsData.slice(0, 3)); // Show only 3 recent
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: CalendarDays,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      title: "Pending",
      value: stats?.pendingBookings || 0,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Approved",
      value: stats?.approvedBookings || 0,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Favorites",
      value: stats?.totalFavorites || 0,
      icon: Heart,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      rejected: "bg-red-500/10 text-red-400 border-red-500/30",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="p-6 md:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Welcome back, <span className="text-teal-500">{session?.user?.name || "Tenant"}</span> 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Here's an overview of your rental activities
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {loading ? "—" : stat.value}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {stat.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        <Link
          href="/properties"
          className="group bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <HomeIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Browse Properties</h3>
              <p className="text-teal-50 text-sm mt-1">Find your next dream home</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/tenant/favorites"
          className="group bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-rose-500/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">My Favorites</h3>
              <p className="text-rose-50 text-sm mt-1">View saved properties</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Bookings
          </h2>
          <Link
            href="/dashboard/tenant/my-bookings"
            className="text-sm text-teal-500 hover:text-teal-400 font-semibold"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <CalendarDays className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
            <p className="text-slate-500 dark:text-slate-400">No bookings yet</p>
            <Link
              href="/properties"
              className="inline-block mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <img
                  src={booking.propertyImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200"}
                  alt={booking.propertyTitle}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                    {booking.propertyTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin size={14} />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-teal-500">৳{booking.amount?.toLocaleString()}</p>
                  <span className={`inline-block mt-1 px-3 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}