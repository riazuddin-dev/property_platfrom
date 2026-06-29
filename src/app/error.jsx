// src/app/error.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Next.js Boundary Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">
      <div className="text-center max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>

        <h1 className="text-3xl font-bold text-white tracking-tight">
          Something went wrong!
        </h1>

        <p className="text-slate-400 mt-3 text-sm leading-relaxed">
          An unexpected error occurred in our system. Please try reloading the page or go back to home.
        </p>

        {error?.message && (
          <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono text-rose-400/90 break-all text-left max-h-32 overflow-y-auto">
            Error: {error.message}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl font-semibold transition"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-semibold transition border border-slate-700"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
