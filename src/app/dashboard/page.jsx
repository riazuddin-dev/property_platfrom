"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getUserRole } from "@/services/userApi";

export default function DashboardRedirect() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectUser = async () => {
      if (!session?.user?.email) {
        router.push("/login");
        return;
      }

      try {
        const roleData = await getUserRole(session.user.email);
        const role = roleData?.role || "tenant";

        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "owner") {
          router.push("/dashboard/owner");
        } else {
          router.push("/dashboard/tenant");
        }
      } catch (error) {
        console.error("Role fetch error:", error);
        router.push("/dashboard/tenant"); // fallback
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && session) {
      redirectUser();
    } else if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return null;
}