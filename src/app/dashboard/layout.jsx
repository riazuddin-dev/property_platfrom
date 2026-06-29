// src/app/dashboard/layout.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi";

import { Loader2 } from "lucide-react";
import DashboardSidebar from "@/components/shared/dashboardComponents/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const fetchRole = async () => {
      try {
        const roleData = await getUserRole(session.user.email);
        const userRole = roleData?.role || "tenant";
        setRole(userRole);

        if (pathname === "/dashboard") {
          if (userRole === "admin") router.replace("/dashboard/admin");
          else if (userRole === "owner") router.replace("/dashboard/owner");
          else router.replace("/dashboard/tenant");
        } else if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
          if (userRole === "owner") router.replace("/dashboard/owner");
          else router.replace("/dashboard/tenant");
        } else if (pathname.startsWith("/dashboard/owner") && userRole !== "owner") {
          if (userRole === "admin") router.replace("/dashboard/admin");
          else router.replace("/dashboard/tenant");
        } else if (pathname.startsWith("/dashboard/tenant") && userRole !== "tenant") {
          if (userRole === "admin") router.replace("/dashboard/admin");
          else if (userRole === "owner") router.replace("/dashboard/owner");
        }
      } catch (error) {
        console.error("Role fetch error:", error);
        setRole("tenant");
        if (pathname === "/dashboard") router.replace("/dashboard/tenant");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [session, isPending, router, pathname]);

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto" />
          <p className="mt-4 text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardSidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}