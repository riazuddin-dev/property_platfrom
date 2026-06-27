"use client";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } =
    authClient.useSession();

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Profile 👤
      </h1>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg max-w-3xl">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-3xl font-bold">
            {session?.user?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {session?.user?.name}
            </h2>

            <p className="text-slate-500">
              {session?.user?.email}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl">
            <h3 className="text-slate-500">
              Account Type
            </h3>

            <p className="text-xl font-bold mt-2">
              Tenant
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl">
            <h3 className="text-slate-500">
              Status
            </h3>

            <p className="text-xl font-bold mt-2 text-green-500">
              Active
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}