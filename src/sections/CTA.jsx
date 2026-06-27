"use client";

import { ArrowRight, Building2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 p-10 md:p-16">
          
          {/* Background Blur */}
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white text-sm">
              <Building2 size={16} />
              Start Your Journey Today
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white">
              Ready To Find Your
              <span className="block">
                Dream Property?
              </span>
            </h2>

            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Explore thousands of verified properties, connect with trusted
              owners and book your perfect place with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition">
                Browse Properties
                <ArrowRight size={18} />
              </button>

              <button className="border border-white/40 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition">
                Become An Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}