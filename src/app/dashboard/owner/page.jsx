"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";
import { Home, Calendar, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export default function OwnerDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Owner Dashboard Error:", error);
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
    <div className="p-8 space-y-10">
      <div>
        <h1 className="text-5xl font-bold">Welcome back, {session?.user?.name} 👋</h1>
        <p className="text-slate-400 mt-2">Manage your properties and bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Properties</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalProperties || 0}</p>
            </div>
            <Home className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Earnings</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">৳{stats?.totalEarnings?.toLocaleString() || 0}</p>
            </div>
            <DollarSign className="w-14 h-14 text-emerald-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Active Bookings</p>
              <p className="text-5xl font-bold mt-4">{stats?.approvedBookings || 0}</p>
            </div>
            <Calendar className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Occupancy Rate</p>
              <p className="text-5xl font-bold mt-4">{stats?.occupancyRate || 0}%</p>
            </div>
            <Users className="w-14 h-14 text-teal-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/owner/properties" className="p-8 bg-slate-900 rounded-3xl hover:bg-slate-800 transition text-center">
          <div className="text-4xl mb-4">🏠</div>
          <p className="font-semibold">My Properties</p>
        </Link>
        <Link href="/dashboard/owner/bookings" className="p-8 bg-slate-900 rounded-3xl hover:bg-slate-800 transition text-center">
          <div className="text-4xl mb-4">📋</div>
          <p className="font-semibold">Booking Requests</p>
        </Link>
        <Link href="/dashboard/owner/transactions" className="p-8 bg-slate-900 rounded-3xl hover:bg-slate-800 transition text-center">
          <div className="text-4xl mb-4">💰</div>
          <p className="font-semibold">Earnings</p>
        </Link>
      </div>
    </div>
  );
}