"use client";

// src/app/loading.jsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-5">
      <div className="text-center">
        {/* Glowing Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-teal-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-r-teal-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-cyan-500/10"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-cyan-400 border-l-cyan-400 animate-spin-reverse"></div>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-wide animate-pulse">
          Loading Stay<span className="text-teal-400">Sphere</span>
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
          Preparing premium properties and workspace stats...
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
