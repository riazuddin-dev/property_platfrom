// src/app/register/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, Mail, Lock, ImageIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Better Auth session check
  const { data: session, isPending } = authClient.useSession();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  // ✅ If already logged in, redirect to home
  useEffect(() => {
    if (!isPending && session?.user) {
      toast.success("Already logged in! Redirecting...");
      router.replace("/");
    }
  }, [session, isPending, router]);

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Checking session...</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Step 1: Sign up with Better Auth
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || "https://i.pravatar.cc/150?img=12",
        callbackURL: "/", // ✅ Home page এ redirect
      });

      console.log("📋 Registration result:", result);

      if (result?.error) {
        console.error("❌ Registration error:", result.error);
        toast.error(result.error.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Step 2: Save user to database with default role "tenant"
      const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          image: data.image || "https://i.pravatar.cc/150?img=12",
          role: "tenant", // ✅ Default role
        }),
      });

      const saveResult = await saveResponse.json();

      if (saveResult?.success) {
        reset();
        toast.success("Account Created Successfully! 🎉 Welcome to StaySphere");
        
        // ✅ সফল রেজিস্ট্রেশনের পর হোম পেজে রিডাইরেক্ট
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        toast.error("Failed to save user data");
        setLoading(false);
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      toast.error(error?.message || "Registration Failed. Try different email.");
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
      toast.success("Redirecting...");
    } catch (error) {
      console.error("❌ Google registration error:", error);
      toast.error("Google registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-16 left-16 z-10 text-white max-w-md">
          <h1 className="text-6xl font-bold tracking-tighter">
            Stay<span className="text-teal-400">Sphere</span>
          </h1>
          <p className="mt-6 text-xl text-white/90">
            Join thousands of tenants and owners on the most trusted rental platform.
          </p>
          
          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-teal-400">5000+</p>
              <p className="text-sm text-white/60">Properties</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-400">1000+</p>
              <p className="text-sm text-white/60">Happy Tenants</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-400">98%</p>
              <p className="text-sm text-white/60">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Create Account 🚀
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Start your rental journey today
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="font-medium block mb-2 text-slate-700 dark:text-slate-300">
                Full Name *
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 focus-within:border-teal-500 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900 transition-all">
                <User size={20} className="text-slate-400" />
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your full name"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="font-medium mb-2 block text-slate-700 dark:text-slate-300">
                Photo URL <span className="text-slate-400 text-sm">(Optional)</span>
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 focus-within:border-teal-500 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900 transition-all">
                <ImageIcon size={20} className="text-slate-400" />
                <input
                  {...register("image")}
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-medium block mb-2 text-slate-700 dark:text-slate-300">
                Email Address *
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 focus-within:border-teal-500 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900 transition-all">
                <Mail size={20} className="text-slate-400" />
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium block mb-2 text-slate-700 dark:text-slate-300">
                Password *
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 focus-within:border-teal-500 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900 transition-all">
                <Lock size={20} className="text-slate-400" />
                <input
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Minimum 6 characters
              </p>
            </div>

            {/* Info Note */}
            <div className="bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 rounded-xl p-4">
              <p className="text-sm text-teal-700 dark:text-teal-300">
                💡 <strong>Note:</strong> All new accounts are created as{" "}
                <strong>Tenant</strong> by default. You can request role change later.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all disabled:opacity-70 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
              <span className="text-sm text-slate-500">OR</span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full border border-slate-300 dark:border-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition bg-white dark:bg-slate-900 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin text-slate-500" />
              ) : (
                <>
                  <FcGoogle size={24} />
                  <span className="font-medium text-slate-900 dark:text-white">
                    Continue with Google
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-500 font-medium hover:underline transition"
            >
              Sign In
            </Link>
          </p>
          
          {/* Terms */}
          <p className="text-center mt-6 text-xs text-slate-400">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-teal-400 hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-teal-400 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}