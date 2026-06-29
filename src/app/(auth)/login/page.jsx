// src/app/login/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Shield, Home, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ✅ সঠিকভাবে useSession ব্যবহার করুন
  const { data: session, isPending } = authClient.useSession();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  // ✅ ইতিমধ্যে লগইন করা থাকলে রিডাইরেক্ট
  useEffect(() => {
    if (!isPending && session?.user) {
      toast.success("Already logged in!");
      router.replace("/");
    }
  }, [session, isPending, router]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("🔐 Attempting login for:", data.email);

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/", // ✅ Home page এ redirect
      });

      console.log("📋 Login result:", result);

      if (result?.error) {
        console.error("❌ Login error:", result.error);
        toast.error(result.error.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      console.log("✅ Login successful!");
      toast.success("Welcome back! 🎉");
      
      // ✅ সফল লগইনের পর হোম পেজে রিডাইরেক্ট
      setTimeout(() => {
        router.push("/");
      }, 500);

    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // ✅ Home page এ redirect
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
      setLoading(false);
    }
  };

  // ✅ লোডিং স্টেট
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
      {/* Left Side - Hero */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex relative overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-16 left-16 z-10 text-white max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 px-4 py-2 rounded-full text-teal-400 text-sm mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="font-semibold">Premium Properties</span>
            </div>
            
            <h1 className="text-6xl font-bold tracking-tighter mb-6">
              Stay<span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Sphere</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Find your dream property with confidence and ease
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <div className="p-2 bg-teal-500/20 rounded-lg backdrop-blur-md">
                  <Shield size={16} className="text-teal-400" />
                </div>
                <span>Verified & Secure Properties</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="p-2 bg-teal-500/20 rounded-lg backdrop-blur-md">
                  <Home size={16} className="text-teal-400" />
                </div>
                <span>5000+ Premium Listings</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-6 py-12 bg-slate-950"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Welcome Back <span className="inline-block animate-bounce">👋</span>
              </h2>
              <p className="mt-3 text-slate-400 text-lg">
                Sign in to continue to StaySphere
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email Field */}
            <div>
              <label className="font-medium mb-2 block text-slate-300">
                Email Address
              </label>
              <div className="flex items-center gap-3 border border-white/10 focus-within:border-teal-500/50 rounded-2xl px-5 py-4 bg-slate-900/50 backdrop-blur-xl transition-all">
                <Mail size={20} className="text-slate-400" />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="font-medium mb-2 block text-slate-300">
                Password
              </label>
              <div className="flex items-center gap-3 border border-white/10 focus-within:border-teal-500/50 rounded-2xl px-5 py-4 bg-slate-900/50 backdrop-blur-xl transition-all">
                <Lock size={20} className="text-slate-400" />
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-teal-400 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-teal-400 hover:text-teal-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all disabled:opacity-70 shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 group"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-sm text-slate-500 font-medium">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-900/50 transition-all bg-slate-900/30 backdrop-blur-xl disabled:opacity-70"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin text-white" />
              ) : (
                <>
                  <FcGoogle size={24} />
                  <span className="font-medium text-white">
                    Continue with Google
                  </span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Register Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-slate-400"
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-teal-400 font-semibold hover:text-teal-300 transition"
            >
              Create Account
            </Link>
          </motion.p>

          {/* Footer Note */}
          <p className="text-center mt-6 text-xs text-slate-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-teal-400 hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-teal-400 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}