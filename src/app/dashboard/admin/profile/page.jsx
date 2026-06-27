"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getUserByEmail } from "@/services/userApi";
import { User, Mail, Calendar, Shield, Award } from "lucide-react";

export default function AdminProfile() {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      try {
        const result = await getUserByEmail(session.user.email);
        setUser(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Profile</h1>
        <p className="text-slate-400 mt-2">Platform Administrator</p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-12 border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-teal-500 shadow-2xl relative">
              <img
                src={user?.image || session?.user?.image || "https://i.pravatar.cc/300"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-xs px-4 py-1 rounded-full font-medium flex items-center gap-1">
                <Shield size={16} /> Admin
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <div>
                <div className="flex items-center gap-3 text-slate-400 mb-3">
                  <User size={22} />
                  <span className="uppercase text-xs tracking-widest font-medium">Full Name</span>
                </div>
                <p className="text-4xl font-bold text-white">{user?.name || session?.user?.name}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-slate-400 mb-3">
                  <Mail size={22} />
                  <span className="uppercase text-xs tracking-widest font-medium">Email Address</span>
                </div>
                <p className="text-xl text-slate-300">{user?.email || session?.user?.email}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-slate-400 mb-3">
                  <Shield size={22} />
                  <span className="uppercase text-xs tracking-widest font-medium">Account Type</span>
                </div>
                <span className="inline-block px-8 py-3 bg-purple-500/10 text-purple-400 rounded-2xl font-semibold text-lg">
                  Administrator
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 text-slate-400 mb-3">
                  <Calendar size={22} />
                  <span className="uppercase text-xs tracking-widest font-medium">Member Since</span>
                </div>
                <p className="text-xl text-slate-300">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : "Recently Joined"}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-700">
              <div className="flex items-center gap-4 text-emerald-400">
                <Award size={28} />
                <div>
                  <p className="font-medium">Platform Administrator</p>
                  <p className="text-sm text-slate-400">Full access to manage users, properties, and bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="btn bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-medium">
          Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
}