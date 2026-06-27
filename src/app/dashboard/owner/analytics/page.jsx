"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";

export default function AnalyticsPage() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (!session?.user?.email) return;

        const result = await getDashboardStats(session.user.email);

        setStats(result);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, [session]);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const chartData = [
    {
      name: "Properties",
      value: stats.totalProperties,
    },
    {
      name: "Bookings",
      value: stats.totalBookings,
    },
    {
      name: "Approved",
      value: stats.approvedBookings,
    },
    {
      name: "Pending",
      value: stats.pendingBookings,
    },
  ];

  const pieData = [
    {
      name: "Approved",
      value: stats.approvedProperties,
    },
    {
      name: "Pending",
      value: stats.pendingProperties,
    },
    {
      name: "Rejected",
      value: stats.rejectedProperties,
    },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Analytics Dashboard 📊</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow">
          <h3 className="text-slate-500">Total Properties</h3>

          <h2 className="text-4xl font-bold mt-2">{stats.totalProperties}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow">
          <h3 className="text-slate-500">Total Bookings</h3>

          <h2 className="text-4xl font-bold mt-2">{stats.totalBookings}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow">
          <h3 className="text-slate-500">Approved</h3>

          <h2 className="text-4xl font-bold mt-2 text-green-500">
            {stats.approvedBookings}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow">
          <h3 className="text-slate-500">Pending</h3>

          <h2 className="text-4xl font-bold mt-2 text-orange-500">
            {stats.pendingBookings}
          </h2>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow">
        <h2 className="text-2xl font-bold mb-6">Booking Overview</h2>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Property Status</h2>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>


        <div className="grid md:grid-cols-2 gap-6 mt-8">

  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow">

    <h2 className="text-xl font-bold">

      Total Earnings

    </h2>

    <h1 className="text-5xl font-bold text-teal-500 mt-3">

      ৳{stats.totalEarnings}

    </h1>

  </div>

  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow">

    <h2 className="text-xl font-bold">

      Occupancy Rate

    </h2>

    <h1 className="text-5xl font-bold text-blue-500 mt-3">

      {stats.occupancyRate}%

    </h1>

  </div>

</div>
      </div>
    </div>
  );
}
