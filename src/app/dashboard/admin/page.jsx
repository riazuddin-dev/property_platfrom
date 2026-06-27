// src/app/dashboard/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardApi";
import { Users, Home, Calendar, DollarSign, TrendingUp } from "lucide-react";

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
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-bold text-white">Welcome back, Admin 👋</h1>
        <p className="text-slate-400 mt-2 text-lg">Platform Overview • Real-time Insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-teal-500 transition">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Users</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalUsers || 0}</p>
            </div>
            <Users className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-teal-500 transition">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Properties</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalProperties || 0}</p>
            </div>
            <Home className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-teal-500 transition">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Bookings</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalBookings || 0}</p>
            </div>
            <Calendar className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500 transition">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Revenue</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">৳{stats?.totalRevenue?.toLocaleString() || 0}</p>
            </div>
            <DollarSign className="w-14 h-14 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 rounded-3xl p-10">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <TrendingUp className="text-teal-400" /> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/dashboard/admin/users" className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center">
            <div className="text-4xl mb-4">👥</div>
            <p className="font-semibold text-lg">Manage Users</p>
          </a>
          <a href="/dashboard/admin/properties" className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center">
            <div className="text-4xl mb-4">🏠</div>
            <p className="font-semibold text-lg">Manage Properties</p>
          </a>
          <a href="/dashboard/admin/bookings" className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-semibold text-lg">All Bookings</p>
          </a>
          <a href="/dashboard/admin/transactions" className="group p-8 bg-slate-800 hover:bg-slate-700 rounded-3xl transition text-center">
            <div className="text-4xl mb-4">💰</div>
            <p className="font-semibold text-lg">Transactions</p>
          </a>
        </div>
      </div>
    </div>
  );
}