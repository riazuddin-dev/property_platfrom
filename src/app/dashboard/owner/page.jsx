// src/app/dashboard/owner/page.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, CalendarDays, DollarSign, TrendingUp, Clock, CheckCircle2, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";
import { getBookingRequests } from "@/services/bookingApi";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OwnerDashboard() {
  const { data: session } = authClient.useSession();
  
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo chart data (replace with real API data)
  const chartData = [
    { name: 'Jan', earnings: 15000 },
    { name: 'Feb', earnings: 22000 },
    { name: 'Mar', earnings: 18000 },
    { name: 'Apr', earnings: 35000 },
    { name: 'May', earnings: 28000 },
    { name: 'Jun', earnings: 42000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, bookingsData] = await Promise.all([
          getDashboardStats(),
          getBookingRequests(session?.user?.email || ""),
        ]);
        setStats(statsData);
        if (Array.isArray(bookingsData)) {
          setBookings(bookingsData.slice(0, 3));
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchData();
    }
  }, [session]);

  const statCards = [
    { title: "Total Earnings", value: `৳${stats?.totalEarnings?.toLocaleString() || 0}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Total Properties", value: stats?.totalProperties || 0, icon: Building2, color: "text-teal-400", bg: "bg-teal-500/10" },
    { title: "Total Bookings", value: stats?.totalBookings || 0, icon: CalendarDays, color: "text-blue-400", bg: "bg-blue-500/10" },
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
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Owner Dashboard 
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Welcome back, <span className="text-teal-500 font-semibold">{session?.user?.name}</span>. Here is your business overview.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <Icon className={stat.color} size={28} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {loading ? "—" : stat.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Monthly Earnings</h2>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-semibold">
            <TrendingUp size={16} /> +12.5%
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#14b8a6" 
                strokeWidth={3} 
                dot={{ fill: '#14b8a6', r: 5 }} 
                activeDot={{ r: 7 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Booking Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Booking Requests</h2>
          <Link href="/dashboard/owner/booking-requests" className="text-sm text-teal-500 hover:text-teal-400 font-semibold">
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {bookings.map((req) => (
            <div key={req._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{req.tenantName || req.tenantEmail}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {req.propertyTitle}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-teal-500">৳{req.amount?.toLocaleString()}</p>
                <span className={`inline-block mt-1 px-3 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(req.status)}`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}