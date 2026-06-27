"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardApi";
import { Calendar, Heart, DollarSign, Home, TrendingUp } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TenantDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        toast.success("Dashboard Loaded Successfully");
      } catch (error) {
        console.error("Tenant Dashboard Error:", error);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6">
      <div>
        <h1 className="text-5xl font-bold text-white">Welcome back, Tenant 👋</h1>
        <p className="text-slate-400 mt-2 text-lg">Your rental overview at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 hover:border-teal-500/50 transition-all premium-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Bookings</p>
              <p className="text-5xl font-bold mt-4 text-white">{stats?.totalBookings || 0}</p>
            </div>
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all premium-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Approved Bookings</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">{stats?.approvedBookings || 0}</p>
            </div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <Home className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 hover:border-amber-500/50 transition-all premium-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Pending Bookings</p>
              <p className="text-5xl font-bold mt-4 text-amber-400">{stats?.pendingBookings || 0}</p>
            </div>
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500/50 transition-all premium-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Spent</p>
              <p className="text-5xl font-bold mt-4 text-cyan-400">৳{stats?.totalPaid?.toLocaleString() || 0}</p>
            </div>
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/tenant/my-bookings" className="group bg-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-teal-500 hover:-translate-y-1 transition-all">
          <Calendar className="w-16 h-16 text-teal-400 mb-6" />
          <h3 className="text-2xl font-semibold mb-2">My Bookings</h3>
          <p className="text-slate-400">View all your rental bookings</p>
        </Link>

        <Link href="/dashboard/tenant/favorites" className="group bg-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-red-500 hover:-translate-y-1 transition-all">
          <Heart className="w-16 h-16 text-red-400 mb-6" />
          <h3 className="text-2xl font-semibold mb-2">Favorites</h3>
          <p className="text-slate-400">Saved properties ({stats?.totalFavorites || 0})</p>
        </Link>

        <Link href="/dashboard/tenant/profile" className="group bg-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-purple-500 hover:-translate-y-1 transition-all">
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
            👤
          </div>
          <h3 className="text-2xl font-semibold mb-2">My Profile</h3>
          <p className="text-slate-400">Update your information</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 rounded-3xl p-10 border border-slate-700">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-teal-400" />
          <h3 className="text-2xl font-semibold">Recent Activity</h3>
        </div>
        <p className="text-slate-400 text-center py-12">Your recent bookings and payments will appear here soon.</p>
      </div>
    </div>
  );
}