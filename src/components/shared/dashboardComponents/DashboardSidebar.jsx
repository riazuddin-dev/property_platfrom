// src/components/shared/DashboardSidebar.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, Users, Building2, CalendarDays, User, LogOut,
  Home, Heart, BarChart3, PlusCircle, CreditCard, Loader2
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [role, setRole] = useState("tenant");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      
      try {
        console.log("📡 Loading user data for:", session.user.email);
        const user = await getUserRole(session.user.email);
        console.log("✅ User data loaded:", user);
        
        setUserData(session.user);
        setRole(user?.role || "tenant");
      } catch (error) {
        console.error("❌ Error loading user:", error);
        setRole("tenant");
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [session]);

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");
      
      // Clear cookies
      document.cookie = "better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "better-auth.session_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Call backend logout
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Logout failed");
    }
  };

  // Role-based menus
  const adminMenus = [
    { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Properties", href: "/dashboard/admin/properties", icon: Building2 },
    { title: "Bookings", href: "/dashboard/admin/bookings", icon: CalendarDays },
    { title: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    { title: "Profile", href: "/dashboard/admin/profile", icon: User },
  ];

  const ownerMenus = [
    { title: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
    { title: "Add Property", href: "/dashboard/owner/add-property", icon: PlusCircle },
    { title: "My Properties", href: "/dashboard/owner/my-properties", icon: Building2 },
    { title: "Booking Requests", href: "/dashboard/owner/booking-requests", icon: CalendarDays },
    { title: "Analytics", href: "/dashboard/owner/analytics", icon: BarChart3 },
    { title: "Profile", href: "/dashboard/owner/profile", icon: User },
  ];

  const tenantMenus = [
    { title: "Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
    { title: "My Bookings", href: "/dashboard/tenant/my-bookings", icon: CalendarDays },
    { title: "Favorites", href: "/dashboard/tenant/favorites", icon: Heart },
    { title: "Profile", href: "/dashboard/tenant/profile", icon: User },
  ];

  let menus = tenantMenus;
  if (role === "admin") menus = adminMenus;
  if (role === "owner") menus = ownerMenus;

  if (loading) {
    return (
      <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Stay<span className="text-teal-400">Sphere</span>
            </h2>
            <p className="text-xs text-slate-400 capitalize">{role} Panel</p>
          </div>
        </Link>
      </div>

      {/* Back to Home */}
      <div className="p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl py-3 transition"
        >
          <Home size={18} /> Back To Home
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {menu.title}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3 mb-3">
          <Image
            src={userData?.image || "https://i.pravatar.cc/150"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-teal-500"
            unoptimized
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">
              {userData?.name || "User"}
            </h4>
            <p className="text-xs text-slate-400 truncate capitalize">{role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}