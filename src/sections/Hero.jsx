// src/sections/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Home,
  DollarSign,
  Calendar,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const slides = [
  {
    eyebrow: "Premium rental marketplace",
    title: "Find a home that feels like yours",
    subtitle:
      "Search verified properties, filter by lifestyle, and book with confidence on StaySphere.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
  },
  {
    eyebrow: "For property owners",
    title: "List once. Attract serious tenants.",
    subtitle:
      "Publish polished listings, manage booking requests, and grow occupancy with a trusted platform.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
  },
  {
    eyebrow: "Built for Bangladesh",
    title: "From studio to luxury villa",
    subtitle:
      "Explore apartments, houses, and villas with clear pricing, real photos, and secure payments.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
  },
];

export default function Hero() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault?.();
    const params = new URLSearchParams();
    if (searchData.location) params.append("location", searchData.location);
    if (searchData.propertyType) params.append("type", searchData.propertyType);
    if (searchData.minPrice) params.append("minPrice", searchData.minPrice);
    if (searchData.maxPrice) params.append("maxPrice", searchData.maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const handleQuickFilter = (filter) => {
    const params = new URLSearchParams();
    if (filter.includes("Bedroom")) {
      const match = filter.match(/(\d+)/);
      if (match) params.append("bedrooms", match[1]);
    }
    if (filter.includes("Luxury")) {
      params.append("type", "Villa");
    }
    if (filter.includes("50,000")) {
      params.append("maxPrice", "50000");
    }
    if (filter.includes("Ready")) {
      params.append("available", "true");
    }
    router.push(`/properties?${params.toString()}`);
  };

  const slide = slides[index];

  return (
    <section className="relative flex min-h-[65vh] w-full items-center overflow-hidden sm:min-h-[68vh] lg:min-h-[70vh]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-teal-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.18),transparent_35%)]" />
        {/* Soft grid */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl"
          >
            <Sparkles className="text-teal-300" size={16} />
            StaySphere · Trusted rental platform
          </motion.div>

          <div className="relative min-h-[200px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55 }}
              >
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
                  {slide.eyebrow}
                </p>
                <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2 shadow-2xl shadow-teal-950/30 backdrop-blur-2xl"
          >
            <div className="rounded-2xl bg-white p-2 dark:bg-slate-950">
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="rounded-lg bg-teal-100 p-2 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">
                    <MapPin size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Location
                    </span>
                    <input
                      value={searchData.location}
                      onChange={(e) =>
                        setSearchData({ ...searchData, location: e.target.value })
                      }
                      placeholder="Dhaka, Gulshan..."
                      className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                  </span>
                </label>

                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="rounded-lg bg-cyan-100 p-2 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
                    <Home size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Type
                    </span>
                    <select
                      value={searchData.propertyType}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          propertyType: e.target.value,
                        })
                      }
                      className="w-full appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none dark:text-white"
                    >
                      <option value="">Any type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </label>

                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                    <DollarSign size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Min rent
                    </span>
                    <input
                      type="number"
                      value={searchData.minPrice}
                      onChange={(e) =>
                        setSearchData({ ...searchData, minPrice: e.target.value })
                      }
                      placeholder="৳10,000"
                      className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                  </span>
                </label>

                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="rounded-lg bg-teal-100 p-2 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">
                    <DollarSign size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Max rent
                    </span>
                    <input
                      type="number"
                      value={searchData.maxPrice}
                      onChange={(e) =>
                        setSearchData({ ...searchData, maxPrice: e.target.value })
                      }
                      placeholder="৳100,000"
                      className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-teal-500/25 transition hover:from-teal-500 hover:via-cyan-500 hover:to-teal-500"
              >
                <Search size={20} />
                Search Properties
                <ArrowRight size={18} />
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "3 Bedroom near School",
              "Luxury Apartment",
              "Under ৳50,000",
              "Ready to Move",
            ].map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => handleQuickFilter(text)}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:text-sm"
              >
                {text}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-teal-300" : "w-3 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right visual card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-400/25 via-transparent to-cyan-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Why StaySphere</p>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Live marketplace
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified listings",
                  text: "Owners and properties reviewed for trust.",
                },
                {
                  icon: Building2,
                  title: "Smart filters",
                  text: "Location, type, and rent range in one search.",
                },
                {
                  icon: Calendar,
                  title: "Secure booking",
                  text: "Stripe-powered payments and clear requests.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-sm text-white/60">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "15K+", v: "Listings" },
                { k: "8K+", v: "Tenants" },
                { k: "98%", v: "Success" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-center"
                >
                  <p className="text-lg font-bold text-white">{s.k}</p>
                  <p className="text-[11px] text-white/50">{s.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href="/properties"
                className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-teal-50"
              >
                Browse homes
              </Link>
              <Link
                href="/register"
                className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                Get started
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950/40 to-transparent dark:from-slate-950" />
    </section>
  );
}
