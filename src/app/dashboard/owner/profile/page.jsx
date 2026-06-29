"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getUserByEmail } from "@/services/userApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, Shield, Building2, 
  Edit3, Save, X, Camera, Home, Eye, 
  MessageSquare, DollarSign, CheckCircle,
  TrendingUp, Award, Settings, Star,
  MapPin, Key, BarChart3, Users
} from "lucide-react";
import Swal from "sweetalert2";

export default function OwnerProfile() {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      try {
        const result = await getUserByEmail(session.user.email);
        setUser(result);
        setEditData({
          name: result?.name || session?.user?.name || "",
          email: result?.email || session?.user?.email || "",
          phone: result?.phone || "",
          address: result?.address || "",
          bio: result?.bio || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [session]);

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      text: "Your profile has been updated successfully",
      timer: 2000,
      showConfirmButton: false,
    });
    setIsEditing(false);
  };

  const stats = [
    { icon: Home, label: "Properties Listed", value: "8", color: "from-blue-500 to-cyan-500" },
    { icon: Eye, label: "Total Views", value: "2.4K", color: "from-purple-500 to-violet-500" },
    { icon: Key, label: "Active Rentals", value: "5", color: "from-emerald-500 to-teal-500" },
    { icon: DollarSign, label: "Revenue", value: "৳1.2L", color: "from-amber-500 to-orange-500" },
  ];

  const profileCompletion = 85;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 md:p-12 shadow-2xl mb-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={user?.image || session?.user?.image || "https://i.pravatar.cc/300"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {user?.name || session?.user?.name || "Owner"}
                </h1>
                <CheckCircle className="text-emerald-300" size={28} fill="currentColor" />
              </div>
              
              <p className="text-amber-100 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} />
                {user?.email || session?.user?.email}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium flex items-center gap-2">
                  <Building2 size={14} />
                  Property Owner
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium flex items-center gap-2">
                  <Calendar size={14} />
                  {user?.createdAt 
                    ? `Member since ${new Date(user.createdAt).getFullYear()}` 
                    : "Recently Joined"}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-white text-amber-600 rounded-2xl font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          </div>

          {/* Profile Completion */}
          <div className="relative mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm font-medium">Profile Completion</span>
              <span className="text-white font-bold">{profileCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profileCompletion}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-emerald-300 to-white rounded-full"
              />
            </div>
            <p className="text-white/60 text-xs mt-2">Complete your profile to attract more tenants</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white" size={22} />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Account Information</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Full Name</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{user?.name || session?.user?.name}</p>
                </div>
                <User size={18} className="text-amber-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{user?.email || session?.user?.email}</p>
                </div>
                <Mail size={18} className="text-amber-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Account Type</p>
                  <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 size={14} className="text-amber-500" />
                    {user?.role || "Owner"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Member Since</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user?.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
                      : "Recently Joined"}
                  </p>
                </div>
                <Calendar size={18} className="text-amber-500" />
              </div>
            </div>
          </motion.div>

          {/* Achievements & Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <Award className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Achievements</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  🏆
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">Top Landlord</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">5+ properties listed</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-2xl border border-blue-200 dark:border-blue-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                  ⭐
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">Highly Rated</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">4.8+ average rating</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                  ✅
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">Verified Owner</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Identity verified</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 opacity-60">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 font-bold">
                  🔒
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-500 dark:text-slate-400">Premium Owner</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Upgrade to premium</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <Settings className="text-amber-500" size={22} />
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Edit3 className="text-amber-600 dark:text-amber-400" size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Edit Profile</span>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="text-blue-600 dark:text-blue-400" size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Add Property</span>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="text-purple-600 dark:text-purple-400" size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Analytics</span>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="text-emerald-600 dark:text-emerald-400" size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Messages</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    placeholder="Your address"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    placeholder="Tell tenants about yourself..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}