// src/components/shared/Navbar.jsx
"use client";


import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, LayoutDashboard, LogOut, User, ChevronDown, 
  Home, Building2, Info, Sparkles, Bell, Settings
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "About", href: "/about", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-500/20 text-red-400 border-red-500/30",
      owner: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      tenant: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    };
    return colors[role?.toLowerCase()] || colors.tenant;
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: "👑",
      owner: "🏠",
      tenant: "🔑",
    };
    return icons[role?.toLowerCase()] || "🔑";
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative size-11 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-teal-500/30"
            >
              <span className="relative z-10">S</span>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
              />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
              Stay<span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Sphere</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon size={16} className={isActive ? "text-teal-400" : ""} />
                    <span>{link.name}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="flex items-center gap-2 px-4 py-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full"
                />
              </div>
            ) : session?.user ? (
              <>
                {/* Notification Bell */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  <Bell size={18} className="text-slate-300" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                </motion.button>
                <ThemeToggle></ThemeToggle>

                {/* Dashboard Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:brightness-110 transition font-semibold shadow-lg shadow-teal-500/30"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                </motion.div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2.5 hover:bg-white/5 p-1.5 pr-4 rounded-xl transition border border-transparent hover:border-white/10"
                  >
                    <div className="relative w-9 h-9">
                      <Image
                        src={session.user.image || "https://i.pravatar.cc/150?img=12"}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-2 border-teal-400"
                        unoptimized
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                    </div>
                    <span className="text-white font-medium max-w-[120px] truncate text-sm">
                      {session.user.name}
                    </span>
                    <motion.div
                      animate={{ rotate: profileOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="text-slate-400" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-72 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-br from-teal-500/10 to-cyan-500/10">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                              <Image
                                src={session.user.image || "https://i.pravatar.cc/150?img=12"}
                                alt="Profile"
                                fill
                                className="rounded-full object-cover border-2 border-teal-400"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-white truncate">{session.user.name}</p>
                              <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
                            </div>
                          </div>
                          {session.user.role && (
                            <div className="mt-3 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                                  session.user.role
                                )}`}
                              >
                                <span>{getRoleIcon(session.user.role)}</span>
                                {session.user.role}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 text-slate-300 hover:text-white transition"
                          >
                            <User size={16} />
                            <span className="text-sm font-medium">My Profile</span>
                          </Link>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 text-slate-300 hover:text-white transition"
                          >
                            <Settings size={16} />
                            <span className="text-sm font-medium">Settings</span>
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-white/10 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-red-500/10 text-red-400 transition"
                          >
                            <LogOut size={16} />
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-teal-500/50 text-slate-300 hover:text-white transition font-medium"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-110 text-white font-semibold transition shadow-lg shadow-teal-500/30"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-xl hover:bg-white/5 transition"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="py-6 px-4 space-y-2">
                {/* Navigation Links */}
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <link.icon size={18} />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <ThemeToggle></ThemeToggle>

                {/* User Section */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                  {session?.user ? (
                    <>
                      {/* User Info Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl border border-white/10"
                      >
                        <div className="relative w-11 h-11">
                          <Image
                            src={session.user.image || "https://i.pravatar.cc/150?img=12"}
                            alt="Profile"
                            fill
                            className="rounded-full object-cover border-2 border-teal-400"
                            unoptimized
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate">{session.user.name}</p>
                          <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
                        </div>
                        {session.user.role && (
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                              session.user.role
                            )}`}
                          >
                            {getRoleIcon(session.user.role)} {session.user.role}
                          </span>
                        )}
                      </motion.div>

                      {/* Dashboard Button */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30"
                        >
                          <LayoutDashboard size={18} />
                          Go to Dashboard
                        </Link>
                      </motion.div>

                      {/* Logout Button */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          href="/login"
                          className="block px-4 py-3 text-center border border-white/10 hover:border-teal-500/50 text-slate-300 hover:text-white rounded-xl transition font-medium"
                        >
                          Login
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href="/register"
                          className="block px-4 py-3 text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl transition shadow-lg shadow-teal-500/30"
                        >
                          Get Started
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}