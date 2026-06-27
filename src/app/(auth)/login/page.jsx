"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
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
        
        // ✅ Fixed: Use replace instead of push (prevents going back to login)
        router.replace("/dashboard");
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
      router.replace("/dashboard"); // Google login er por o replace
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
          <h1 className="text-6xl font-bold">Stay<span className="text-teal-400">Sphere</span></h1>
          <p className="mt-6 text-xl">Find your dream property with confidence</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Welcome Back</h2>
            <p className="mt-3 text-slate-500">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="font-medium mb-2 block">Email</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <Mail size={20} />
                <input 
                  {...register("email")} 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full bg-transparent outline-none" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="font-medium mb-2 block">Password</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <Lock size={20} />
                <input 
                  {...register("password")} 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-transparent outline-none" 
                  required 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl font-semibold disabled:opacity-70 transition"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-300 flex-1" />
              <span className="text-slate-500 text-sm">OR</span>
              <div className="h-px bg-slate-300 flex-1" />
            </div>

            <button 
              type="button" 
              onClick={handleGoogle} 
              className="w-full border border-slate-300 dark:border-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <FcGoogle size={24} /> Continue with Google
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500">
            Don't have an account? <Link href="/register" className="text-teal-500 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}