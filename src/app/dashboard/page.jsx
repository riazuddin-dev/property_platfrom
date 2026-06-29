// src/app/dashboard/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const redirect = async () => {
      try {
        const roleData = await getUserRole(session.user.email);
        const role = roleData?.role || "tenant";

        if (role === "admin") router.replace("/dashboard/admin");
        else if (role === "owner") router.replace("/dashboard/owner");
        else router.replace("/dashboard/tenant");
      } catch {
        router.replace("/dashboard/tenant");
      }
    };

    redirect();
  }, [session, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto" />
        <p className="mt-4 text-slate-400">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}