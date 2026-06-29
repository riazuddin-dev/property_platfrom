// src/app/login/page.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error.message || "Invalid credentials");
        return;
      }

      // Get JWT from backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email }),
      });

      const jwtResult = await response.json();

      if (jwtResult?.success) {
        toast.success("Login Successful! Welcome back 🎉");
        // ✅ Changed: Home page এ redirect করবে
        router.replace("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Check your connection.");
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      toast.success("Redirecting...");
      // ✅ Changed: Home page এ redirect করবে
      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200" 
          alt="Luxury" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        
        <div className="absolute bottom-16 left-16 z-10 text-white max-w-md">
          <h1 className="text-6xl font-bold tracking-tighter">
            Stay<span className="text-teal-400">Sphere</span>
          </h1>
          <p className="mt-6 text-xl text-white/90">
            Find your dream property with confidence
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Welcome Back 👋</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="font-medium mb-2 block text-slate-700 dark:text-slate-300">Email</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900">
                <Mail size={20} className="text-slate-400" />
                <input 
                  {...register("email", { required: true })} 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium mb-2 block text-slate-700 dark:text-slate-300">Password</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900">
                <Lock size={20} className="text-slate-400" />
                <input 
                  {...register("password", { required: true })} 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-70 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
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
              className="w-full border border-slate-300 dark:border-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition bg-white dark:bg-slate-900"
            >
              <FcGoogle size={24} />
              <span className="font-medium text-slate-900 dark:text-white">Continue with Google</span>
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-teal-500 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}