// src/components/shared/Footer.jsx
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-11 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-white">
                Stay<span className="text-teal-400">Sphere</span>
              </h2>
            </div>

            <p className="text-slate-400 max-w-md text-lg">
              Premium property rental platform connecting discerning tenants with exceptional homes across Bangladesh.
            </p>

            <div className="flex items-center gap-2 mt-8 text-slate-500">
              Made with <Heart className="text-red-500" size={18} /> for better living
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-6">Platform</h3>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="/properties" className="hover:text-teal-400 transition">Browse Properties</Link></li>
              <li><Link href="/dashboard" className="hover:text-teal-400 transition">Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-teal-400 transition">About Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-teal-400 transition">For Owners</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">For Tenants</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Blog</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold text-white mb-6">Contact</h3>
            <p className="text-slate-400">Dhaka, Bangladesh</p>
            <p className="text-slate-400 mt-1">support@staysphere.com</p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Follow Us</p>
              <div className="flex gap-4 text-2xl text-slate-400">
                {/* Add social icons if needed */}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} StaySphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}