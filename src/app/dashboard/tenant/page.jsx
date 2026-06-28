"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";
import { Calendar, Heart, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TenantDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
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
        <h1 className="text-5xl font-bold">Welcome, {session?.user?.name} 👋</h1>
        <p className="text-slate-400 mt-2">Your Rental Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">My Bookings</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalBookings || 0}</p>
            </div>
            <Calendar className="w-14 h-14 text-teal-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Active Rentals</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">{stats?.approvedBookings || 0}</p>
            </div>
            <CreditCard className="w-14 h-14 text-emerald-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Favorites</p>
              <p className="text-5xl font-bold mt-4">{stats?.totalFavorites || 0}</p>
            </div>
            <Heart className="w-14 h-14 text-red-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">Total Paid</p>
              <p className="text-5xl font-bold mt-4 text-emerald-400">৳{stats?.totalPaid?.toLocaleString() || 0}</p>
            </div>
            <CreditCard className="w-14 h-14 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/tenant/bookings" className="p-8 bg-slate-900 rounded-3xl hover:bg-slate-800 transition">
          <h3 className="text-2xl font-semibold mb-2">My Bookings</h3>
          <p className="text-slate-400">View all your rental requests and active bookings</p>
        </Link>

        <Link href="/favorites" className="p-8 bg-slate-900 rounded-3xl hover:bg-slate-800 transition">
          <h3 className="text-2xl font-semibold mb-2">Favorites ❤️</h3>
          <p className="text-slate-400">Your saved properties</p>
        </Link>
      </div>
    </div>
  );
}