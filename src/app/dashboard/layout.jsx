// frontend/src/app/dashboard/layout.jsx
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Home, BarChart3, Plus, List, Calendar, Users, User } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email && !isPending) {
      router.push("/login");
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-role/${session.user.email}`, {
          credentials: "include",
        });
        const data = await res.json();
        setRole(data.role || "tenant");
      } catch (err) {
        console.error(err);
        setRole("tenant");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchRole();
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, { 
        method: "POST",
        credentials: "include" 
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  const isAdmin = role === "admin";
  const isOwner = role === "owner";
  const isTenant = role === "tenant";

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Premium Sidebar */}
      <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo Header */}
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">StaySphere</h2>
              <p className="text-xs text-teal-400 -mt-1">Dashboard</p>
            </div>
          </div>
          <div className="mt-3 px-3 py-1 bg-teal-500/10 text-teal-400 text-xs rounded-full inline-block capitalize">
            {role} Panel
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-1 overflow-auto">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-slate-800 text-slate-400 hover:text-white mb-6 transition"
          >
            <Home size={20} /> Back to Home
          </Link>

          {/* Tenant Menu */}
          {isTenant && (
            <>
              <Link href="/dashboard/tenant" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname === '/dashboard/tenant' ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <BarChart3 size={20} /> Overview
              </Link>
              <Link href="/dashboard/tenant/my-bookings" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('my-bookings') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <Calendar size={20} /> My Bookings
              </Link>
              <Link href="/dashboard/tenant/favorites" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('favorites') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                ❤️ Favorites
              </Link>
              <Link href="/dashboard/tenant/profile" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('profile') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <User size={20} /> Profile
              </Link>
            </>
          )}

          {/* Owner Menu */}
          {isOwner && (
            <>
              <Link href="/dashboard/owner" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname === '/dashboard/owner' ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <BarChart3 size={20} /> Analytics
              </Link>
              <Link href="/dashboard/owner/add-property" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('add-property') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <Plus size={20} /> Add Property
              </Link>
              <Link href="/dashboard/owner/my-properties" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('my-properties') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <List size={20} /> My Properties
              </Link>
              <Link href="/dashboard/owner/booking-requests" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('booking-requests') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <Calendar size={20} /> Booking Requests
              </Link>
              <Link href="/dashboard/owner/profile" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('profile') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                <User size={20} /> Profile
              </Link>
            </>
          )}

          {/* Admin Menu */}
          {isAdmin && (
            <>
              <Link href="/dashboard/admin" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname === '/dashboard/admin' ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                📊 Dashboard
              </Link>
              <Link href="/dashboard/admin/users" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('users') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                👥 Manage Users
              </Link>
              <Link href="/dashboard/admin/properties" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('properties') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                🏠 Manage Properties
              </Link>
              <Link href="/dashboard/admin/bookings" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('bookings') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                📋 All Bookings
              </Link>
              <Link href="/dashboard/admin/transactions" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('transactions') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                💰 Transactions
              </Link>
              <Link href="/dashboard/admin/profile" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition ${pathname.includes('profile') ? 'bg-teal-500 text-white' : 'hover:bg-slate-800'}`}>
                👤 Profile
              </Link>
            </>
          )}
        </nav>

        {/* User Footer */}
        <div className="p-6 border-t border-slate-800 mt-auto">
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-3xl mb-6">
            <img 
              src={session?.user?.image || "https://i.pravatar.cc/150"} 
              alt="Profile" 
              className="w-12 h-12 rounded-2xl object-cover" 
            />
            <div>
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-4 rounded-2xl transition font-medium"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}