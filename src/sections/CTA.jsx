  "use client";

import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-800 p-10 shadow-2xl sm:p-16 md:rounded-[2.5rem] md:p-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white">
              <Building2 size={18} />
              Start your journey today
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Ready to find your
              <span className="block">dream property?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 sm:text-xl">
              Join thousands of tenants and owners on StaySphere — Bangladesh&apos;s
              trusted rental marketplace.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:scale-[1.02] sm:text-lg"
              >
                Browse Properties
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/dashboard/owner/add-property"
                className="inline-flex rounded-2xl border border-white/40 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:text-lg"
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