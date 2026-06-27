"use client";

import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 p-16 md:p-20 shadow-2xl">
          
          {/* Background Elements */}
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-white text-sm font-medium mb-8">
              <Building2 size={20} />
              Start Your Journey Today
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Ready to find your
              <span className="block">Dream Property?</span>
            </h2>

            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of tenants and owners on Bangladesh's most trusted rental platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link 
                href="/properties"
                className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 transition text-lg"
              >
                Browse Properties
                <ArrowRight size={22} />
              </Link>

              <Link 
                href="/dashboard/owner/add-property"
                className="border border-white/40 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/10 transition text-lg"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}