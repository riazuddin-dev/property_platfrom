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

  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    const reportHtml = `
      <html>
        <head>
          <title>StaySphere - Monthly Earnings Report</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; background: #ffffff; }
            .header { border-bottom: 2px solid #0d9488; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 28px; font-weight: bold; color: #0d9488; }
            .title { font-size: 22px; font-weight: bold; color: #0f172a; text-align: right; }
            .meta { margin-bottom: 30px; font-size: 14px; color: #64748b; line-height: 1.6; }
            .grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; }
            .card h3 { margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
            .card p { margin: 0; font-size: 28px; font-weight: bold; color: #0f172a; }
            .card p.success { color: #10b981; }
            .table-container { margin-top: 40px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th { background: #f1f5f9; text-align: left; padding: 12px 16px; font-weight: 600; font-size: 14px; border-bottom: 2px solid #cbd5e1; }
            td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Stay<span style="color:#06b6d4;">Sphere</span></div>
            <div class="title">Earnings &amp; Booking Summary</div>
          </div>
          
          <div class="meta">
            <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Owner Email:</strong> ${session?.user?.email || "N/A"}</p>
          </div>

          <div class="grid">
            <div class="card">
              <h3>Total Earnings</h3>
              <p class="success">৳${stats.totalEarnings?.toLocaleString() || 0}</p>
            </div>
            <div class="card">
              <h3>Total Properties</h3>
              <p>${stats.totalProperties || 0}</p>
            </div>
            <div class="card">
              <h3>Total Bookings</h3>
              <p>${stats.totalBookings || 0}</p>
            </div>
            <div class="card">
              <h3>Occupancy Rate</h3>
              <p style="color:#3b82f6;">${stats.occupancyRate || 0}%</p>
            </div>
          </div>

          <div class="table-container">
            <h2 style="font-size: 18px; color: #0f172a; margin-bottom: 10px;">Booking Details Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Properties Registered</td>
                  <td>${stats.totalProperties || 0}</td>
                </tr>
                <tr>
                  <td>Approved Properties</td>
                  <td>${stats.approvedProperties || 0}</td>
                </tr>
                <tr>
                  <td>Pending Properties</td>
                  <td>${stats.pendingProperties || 0}</td>
                </tr>
                <tr>
                  <td>Rejected Properties</td>
                  <td>${stats.rejectedProperties || 0}</td>
                </tr>
                <tr>
                  <td>Total Bookings Received</td>
                  <td>${stats.totalBookings || 0}</td>
                </tr>
                <tr>
                  <td>Approved Bookings</td>
                  <td>${stats.approvedBookings || 0}</td>
                </tr>
                <tr>
                  <td>Pending Bookings</td>
                  <td>${stats.pendingBookings || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            StaySphere platform - Property Owner Confidential Report. Generated automatically.
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold">Analytics Dashboard 📊</h1>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-semibold transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
        >
          📥 Download Report (PDF)
        </button>
      </div>

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
