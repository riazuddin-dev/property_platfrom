// src/app/dashboard/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardApi";
import { Users, Home, Calendar, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Admin Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-2 text-lg">Welcome back, Admin • Platform Overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center gap-2 transition">
            <TrendingUp size={18} />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid - Matching Reference Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 hover:border-teal-500/50 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalUsers || 0}</p>
            </div>
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition">
              <Users size={32} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 mt-6 text-sm">
            <ArrowUpRight size={16} /> +12% from last month
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 hover:border-teal-500/50 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Properties</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalProperties || 0}</p>
            </div>
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <Home size={32} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 mt-6 text-sm">
            <ArrowUpRight size={16} /> +8% from last month
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 hover:border-teal-500/50 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Bookings</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalBookings || 0}</p>
            </div>
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
              <Calendar size={32} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 mt-6 text-sm">
            <ArrowUpRight size={16} /> +21% from last month
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Revenue</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">
                ৳{stats?.totalRevenue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <DollarSign size={32} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 mt-6 text-sm">
            <ArrowUpRight size={16} /> +43% from last month
          </div>
        </div>
      </div>

      {/* Quick Actions - Matching Reference */}
      <div className="bg-slate-900 rounded-3xl p-10 border border-slate-700 mb-12">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <TrendingUp className="text-teal-400" /> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/dashboard/admin/users"
            className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center border border-slate-700 hover:border-teal-500"
          >
            <div className="text-5xl mb-6">👥</div>
            <p className="font-semibold text-xl">Manage Users</p>
            <p className="text-slate-400 text-sm mt-2">View &amp; Edit Roles</p>
          </Link>

          <Link
            href="/dashboard/admin/properties"
            className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center border border-slate-700 hover:border-teal-500"
          >
            <div className="text-5xl mb-6">🏠</div>
            <p className="font-semibold text-xl">Manage Properties</p>
            <p className="text-slate-400 text-sm mt-2">Approve / Reject</p>
          </Link>

          <Link
            href="/dashboard/admin/bookings"
            className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center border border-slate-700 hover:border-teal-500"
          >
            <div className="text-5xl mb-6">📋</div>
            <p className="font-semibold text-xl">All Bookings</p>
            <p className="text-slate-400 text-sm mt-2">Monitor Activity</p>
          </Link>

          <Link
            href="/dashboard/admin/transactions"
            className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center border border-slate-700 hover:border-teal-500"
          >
            <div className="text-5xl mb-6">💰</div>
            <p className="font-semibold text-xl">Transactions</p>
            <p className="text-slate-400 text-sm mt-2">Revenue Overview</p>
          </Link>
        </div>
      </div>

      {/* Platform Status */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 border border-slate-700">
        <h3 className="text-2xl font-semibold mb-6">Platform Health</h3>
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>All Systems Operational</span>
          </div>
          <div>1,284 Users Online</div>
          <div>98.7% Uptime</div>
        </div>
      </div>
    </div>
  );
}