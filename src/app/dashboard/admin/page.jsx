// src/app/dashboard/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Building2, CalendarDays, CreditCard, UserPlus, 
  ShieldCheck, TrendingUp, Activity, Zap, BarChart3,
  ArrowUpRight, ArrowDownRight, Eye, Clock, CheckCircle2,
  AlertCircle, Settings, Bell, Search, Filter
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDashboardStats } from "@/services/dashboardApi";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const recentActivities = [
    { id: 1, action: "New user registered", user: "sarah@example.com", time: "2 mins ago", icon: UserPlus, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: 2, action: "Property approved", user: "Gulshan Luxury Villa", time: "15 mins ago", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { id: 3, action: "Booking completed", user: "Booking #1024", time: "1 hour ago", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { id: 4, action: "Payment received", user: "Transaction #8847", time: "2 hours ago", icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { 
      title: "Total Users", 
      value: stats?.totalUsers?.toLocaleString() || 0, 
      change: "+12.5%", 
      trend: "up",
      icon: Users, 
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
      color: "text-blue-400"
    },
    { 
      title: "Total Properties", 
      value: stats?.totalProperties?.toLocaleString() || 0, 
      change: "+8.2%", 
      trend: "up",
      icon: Building2, 
      gradient: "from-purple-500 to-violet-500",
      bg: "bg-purple-500/10",
      color: "text-purple-400"
    },
    { 
      title: "Total Bookings", 
      value: stats?.totalBookings?.toLocaleString() || 0, 
      change: "+23.1%", 
      trend: "up",
      icon: CalendarDays, 
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
      color: "text-emerald-400"
    },
    { 
      title: "Total Revenue", 
      value: `৳${(stats?.totalRevenue / 1000 || 0).toFixed(1)}K`, 
      change: "+18.7%", 
      trend: "up",
      icon: CreditCard, 
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
      color: "text-amber-400"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  Admin Control Center
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Welcome back, {session?.user?.name || "Admin"} 👋
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-3 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl hover:shadow-lg transition-all">
              <Bell size={20} className="text-slate-600 dark:text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button className="p-3 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl hover:shadow-lg transition-all">
              <Settings size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 overflow-hidden group cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                {/* Icon & Trend */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${stat.bg} rounded-2xl backdrop-blur-xl`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                    <TrendIcon size={14} />
                    <span className="text-xs font-semibold">{stat.change}</span>
                  </div>
                </div>

                {/* Value & Title */}
                <div className="relative">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {loading ? (
                      <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>

                {/* Decorative Element */}
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-2xl`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Quick Actions - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-2xl shadow-purple-500/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                  <Zap size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Link 
                  href="/dashboard/admin/users" 
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Users size={18} />
                    </div>
                    <span className="font-medium">Manage Users</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <Link 
                  href="/dashboard/admin/properties" 
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Building2 size={18} />
                    </div>
                    <span className="font-medium">Review Properties</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <Link 
                  href="/dashboard/admin/bookings" 
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <CalendarDays size={18} />
                    </div>
                    <span className="font-medium">Monitor Bookings</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
          </motion.div>

          {/* Recent Activity - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <Activity size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Latest platform events</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                <Filter size={14} />
                Filter
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border ${activity.border} hover:shadow-md transition-all group cursor-pointer`}
                  >
                    <div className={`p-3 ${activity.bg} rounded-xl backdrop-blur-xl group-hover:scale-110 transition-transform`}>
                      <Icon className={activity.color} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                        {activity.action}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {activity.user}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={12} />
                      <span className="whitespace-nowrap">{activity.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Button */}
            <button className="w-full mt-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
              View All Activity
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Platform Health Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Health</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">System performance metrics</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Server Uptime</span>
                <span className="text-sm font-bold text-emerald-500">99.9%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "99.9%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">API Response Time</span>
                <span className="text-sm font-bold text-blue-500">142ms</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Error Rate</span>
                <span className="text-sm font-bold text-amber-500">0.2%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "2%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}