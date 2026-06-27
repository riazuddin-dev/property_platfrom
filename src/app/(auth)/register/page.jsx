"use client";

import Link from "next/link";
import { User, Mail, Lock, ImageIcon, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
      });

      if (result?.data) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            image: data.image || "https://i.pravatar.cc/150?img=12",
          }),
        });

        reset();
        toast.success("Account Created Successfully! 🎉 Please Login");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed. Try different email.");
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      toast.success("Redirecting...");
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
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        
        <div className="absolute bottom-16 left-16 z-10 text-white max-w-md">
          <h1 className="text-6xl font-bold tracking-tighter">
            Stay<span className="text-teal-400">Sphere</span>
          </h1>
          <p className="mt-6 text-xl text-white/90">
            Join thousands of tenants and owners on the most trusted rental platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Create Account 🚀</h2>
            <p className="mt-3 text-slate-500">Start your rental journey today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="font-medium block mb-2">Full Name</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <User size={20} className="text-slate-400" />
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Your full name"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">Photo URL (Optional)</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <ImageIcon size={20} className="text-slate-400" />
                <input
                  {...register("image")}
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">Email Address</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <Mail size={20} className="text-slate-400" />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">Password</label>
              <div className="flex items-center gap-3 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4">
                <Lock size={20} className="text-slate-400" />
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full bg-transparent outline-none"
                />
                <Eye size={20} className="text-slate-400 cursor-pointer" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-70"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
              <span className="text-sm text-slate-500">OR</span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border border-slate-300 dark:border-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-500 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}