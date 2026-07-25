import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          That page doesn&apos;t exist or may have moved. Head home or browse
          available properties.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:from-teal-600 hover:to-cyan-600"
          >
            <Home size={18} />
            Back to home
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-teal-500/40 hover:bg-teal-500/10"
          >
            <Search size={18} />
            Browse properties
          </Link>
        </div>
      </div>
    </div>
  );
}
