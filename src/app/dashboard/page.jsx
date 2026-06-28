// src/app/dashboard/layout.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi"; // or direct from session

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const fetchRole = async () => {
      try {
        // Prefer backend role for consistency
        const userRoleData = await getUserRole(session.user.email);
        const userRole = userRoleData?.role || session.user.role || "tenant";
        setRole(userRole);

        // Role-based redirect if on base /dashboard
        const currentPath = window.location.pathname;
        if (currentPath === "/dashboard") {
          if (userRole === "admin") router.replace("/dashboard/admin");
          else if (userRole === "owner") router.replace("/dashboard/owner");
          else router.replace("/dashboard/tenant");
        }
      } catch (err) {
        console.error("Role fetch failed", err);
        router.replace("/dashboard/tenant"); // fallback
      }
    };

    fetchRole();
  }, [session, isPending, router]);

  if (isPending || !role) {
    return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return <div>{children}</div>;
}