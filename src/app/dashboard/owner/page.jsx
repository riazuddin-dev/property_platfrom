"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardApi";
import { Home, Calendar, DollarSign, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function OwnerDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getDashboardStats();
        console.log("Owner Stats:", data); // Debugging
        setStats(data);
        toast.success("Dashboard Loaded Successfully");
      } catch (error) {
        console.error("Dashboard Error:", error);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [session]);

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
        <h1 className="text-5xl font-bold">Owner Dashboard</h1>
        <p className="text-slate-400 mt-2">Manage your properties and earnings</p>
      </div>

      {/* Stats Cards - Image Match */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-teal-500/50 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Properties</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalProperties || 0}</p>
            </div>
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center">
              <Home className="w-8 h-8 text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Approved Properties</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">{stats?.approvedProperties || 0}</p>
            </div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500/50 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Bookings</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalBookings || 0}</p>
            </div>
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-amber-500/50 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Earnings</p>
              <p className="text-5xl font-bold mt-4 text-amber-400">৳{stats?.totalEarnings?.toLocaleString() || 0}</p>
              
            </div>
            
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/owner/add-property" className="bg-gradient-to-br from-teal-500 to-cyan-500 p-10 rounded-3xl text-white hover:brightness-110 transition text-center group">
          <Plus className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold">Add New Property</h3>
          <p className="text-white/80 mt-2">List a new home for rent</p>
        </Link>

        <Link href="/dashboard/owner/my-properties" className="bg-slate-900 p-10 rounded-3xl hover:bg-slate-800 transition text-center border border-slate-700">
          <Home className="w-16 h-16 mx-auto mb-6 text-teal-400" />
          <h3 className="text-2xl font-semibold">My Properties</h3>
          <p className="text-slate-400 mt-2">Manage your listings</p>
        </Link>

        <Link href="/dashboard/owner/booking-requests" className="bg-slate-900 p-10 rounded-3xl hover:bg-slate-800 transition text-center border border-slate-700">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-teal-400" />
          <h3 className="text-2xl font-semibold">Booking Requests</h3>
          <p className="text-slate-400 mt-2">Review pending bookings</p>
        </Link>
      </div>
    </div>
  );
}