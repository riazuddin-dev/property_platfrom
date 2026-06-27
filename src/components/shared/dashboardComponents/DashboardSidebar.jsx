"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, Building2, CalendarDays, User, LogOut,
  Home, Heart, BarChart3, PlusCircle, CreditCard
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getUserByEmail } from "@/services/userApi";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [role, setRole] = useState("tenant");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      try {
        const user = await getUserByEmail(session.user.email);
        setUserData(user);
        setRole(user?.role || "tenant");
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, [session]);

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

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold">Stay<span className="text-teal-500">Sphere</span></h2>
        <p className="text-sm text-slate-400 capitalize">{role} Panel</p>
      </div>

      <div className="p-4">
        <Link href="/" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl py-3 transition">
          <Home size={18} /> Back To Home
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                pathname === menu.href ? "bg-teal-500 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {menu.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="bg-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <Image
            src={userData?.image || "https://i.pravatar.cc/150"}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full border-2 border-teal-500"
            unoptimized
          />
          <div>
            <h4 className="font-semibold">{userData?.name || "User"}</h4>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => authClient.signOut()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}