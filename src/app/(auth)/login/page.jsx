// src/app/login/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (!isPending && session?.user) {
      toast.success("Already logged in! Redirecting...");
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  const onSubmit = async (data) => {
    try {
      console.log("🔐 Attempting login for:", data.email);

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      console.log("📋 Login result:", result);

      if (result?.error) {
        console.error("❌ Login error:", result.error);
        toast.error(result.error.message || "Invalid credentials");
        return;
      }

      console.log("✅ Login successful!");
      toast.success("Welcome back! 🎉");
      
      setTimeout(() => {
        router.replace("/dashboard");
      }, 500);

    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
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

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Welcome Back 👋
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="font-medium mb-2 block text-slate-700 dark:text-slate-300">
                Email
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900">
                <Mail size={20} className="text-slate-400" />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-medium mb-2 block text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-900">
                <Lock size={20} className="text-slate-400" />
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

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

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
              <span className="text-sm text-slate-500">OR</span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border border-slate-300 dark:border-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition bg-white dark:bg-slate-900"
            >
              <FcGoogle size={24} />
              <span className="font-medium text-slate-900 dark:text-white">
                Continue with Google
              </span>
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