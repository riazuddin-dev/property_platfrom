"use client";

import Image from "next/image";
import { Bell, Moon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/services/userApi";

export default function DashboardTopbar() {
  const { data: session } = authClient.useSession();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      getUserByEmail(session.user.email)
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    }
  }, [session]);

  const profileImage =
    user?.image?.startsWith("http")
      ? user.image
      : "https://i.pravatar.cc/150?img=12";

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back, {user?.name || "User"} 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Theme */}
        <button className="hover:text-teal-500 transition">
          <Moon size={20} />
        </button>

        {/* Notification */}
        <button className="relative hover:text-teal-500 transition">
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl">
          <div className="relative w-10 h-10">
            <Image
              src={profileImage}
              alt="Profile"
              fill
              sizes="40px"
              className="rounded-full object-cover border-2 border-teal-500"
              unoptimized
            />
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-sm">
              {user?.name}
            </h4>

            <p className="text-xs text-slate-500 truncate max-w-[180px]">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}