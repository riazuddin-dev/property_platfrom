// src/components/shared/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();

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

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="size-10 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-3xl shadow-lg"
            >
              S
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tighter text-white">
              Stay<span className="text-teal-400">Sphere</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition hover:text-teal-400 ${
                  pathname === link.href ? "text-teal-400" : "text-slate-300"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-teal-400"></span>
            ) : session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:brightness-110 transition font-semibold shadow-lg shadow-teal-500/20"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <div className="relative" ref={profileRef}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 hover:bg-slate-900 p-1.5 pr-4 rounded-2xl transition"
                  >
                    <div className="relative w-9 h-9">
                      <Image
                        src={session.user.image || "https://i.pravatar.cc/150?img=12"}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-2 border-teal-400"
                        unoptimized
                      />
                    </div>
                    <span className="text-white font-medium max-w-[140px] truncate">
                      {session.user.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-64 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl py-2 z-50"
                      >
                        <div className="px-6 py-4 border-b border-slate-800">
                          <p className="font-semibold text-white">{session.user.name}</p>
                          <p className="text-sm text-slate-400 mb-2">{session.user.email}</p>
                          {session.user.role && (
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                                session.user.role
                              )}`}
                            >
                              {session.user.role}
                            </span>
                          )}
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <User size={18} />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-500/10 text-red-400 transition"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-2xl border border-slate-700 hover:border-teal-500 text-slate-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-lg shadow-teal-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
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
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
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
              className="lg:hidden border-t border-slate-800 bg-slate-950 overflow-hidden"
            >
              <div className="py-6 px-4 space-y-2">
                {/* Navigation Links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                        pathname === link.href
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* User Section */}
                <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
                  {session?.user ? (
                    <>
                      {/* User Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl"
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src={session.user.image || "https://i.pravatar.cc/150?img=12"}
                            alt="Profile"
                            fill
                            className="rounded-full object-cover border-2 border-teal-400"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">{session.user.name}</p>
                          <p className="text-xs text-slate-400">{session.user.email}</p>
                        </div>
                        {session.user.role && (
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                              session.user.role
                            )}`}
                          >
                            {session.user.role}
                          </span>
                        )}
                      </motion.div>

                      {/* Dashboard Link */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20"
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
                          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition"
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
                          className="block px-4 py-3 text-center border border-slate-700 hover:border-teal-500 text-slate-300 hover:text-white rounded-2xl transition"
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
                          className="block px-4 py-3 text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-2xl transition shadow-lg shadow-teal-500/20"
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
    </header>
  );
}