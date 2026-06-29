// src/components/shared/DashboardSidebar.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, Users, Building2, CalendarDays, User, LogOut,
  Home, Heart, BarChart3, PlusCircle, CreditCard, Loader2, Menu, X
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi";
import toast from "react-hot-toast";
import { fetchWithAuth } from "@/utils/api";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [role, setRole] = useState("tenant");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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

  // Close sidebar drawer automatically when pathname changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");
      
      // Clear cookies
      document.cookie = "better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "better-auth.session_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Call backend logout
      await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
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
      <aside className="w-full lg:w-72 lg:min-h-screen bg-slate-950 text-white border-b lg:border-b-0 lg:border-r border-slate-800 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-teal-400" />
          <p className="text-sm text-slate-400">Loading Panel...</p>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden w-full bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-900 fixed top-0 left-0 right-0 z-40 h-20 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-slate-950/80 hover:text-teal-400 rounded-xl transition text-slate-300"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow shadow-teal-500/20">
              S
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Stay<span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Sphere</span>
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full capitalize">
            {role}
          </span>
          <div className="size-9 rounded-full overflow-hidden border-2 border-teal-500/60 shadow">
            <Image
              src={userData?.image || "https://i.pravatar.cc/150"}
              alt="Profile"
              width={36}
              height={36}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white border-r border-slate-900 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-slate-900 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30">
              S
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Stay<span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Sphere</span>
              </h2>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{role} Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-900 rounded-xl transition text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Back to Home Link */}
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-xl py-2.5 transition text-xs font-semibold text-slate-400 hover:text-white"
          >
            <Home size={14} /> Back To Home
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;
            
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-white transition-colors"} />
                <span>{menu.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Status Card & Logout */}
        <div className="p-4 border-t border-slate-900">
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex items-center gap-3 mb-3">
            <Image
              src={userData?.image || "https://i.pravatar.cc/150"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-teal-500/60 object-cover"
              unoptimized
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs truncate text-white">
                {userData?.name || "User"}
              </h4>
              <p className="text-[10px] text-slate-500 truncate capitalize">{role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all text-xs font-bold"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}