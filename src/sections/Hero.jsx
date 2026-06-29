// src/sections/Hero.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Home, DollarSign, Calendar, ChevronDown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = () => {
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
      params.append("luxury", "true");
    }
    if (filter.includes("50,000")) {
      params.append("maxPrice", "50000");
    }
    if (filter.includes("Ready")) {
      params.append("available", "true");
    }

    router.push(`/properties?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-teal-950/80" />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 rounded-full text-white text-sm mb-8 border border-white/20 shadow-xl">
              <Sparkles className="text-yellow-300" size={18} />
              <span className="font-semibold">Trusted by 10,000+ Happy Tenants</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
            Find Your Perfect
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Home Today
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed font-light">
            Discover premium rental properties tailored to your lifestyle. 
            Your dream home is just a search away.
          </motion.p>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-10">
            {[
              { number: "10K+", label: "Properties" },
              { number: "50K+", label: "Happy Tenants" },
              { number: "100+", label: "Cities" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Advanced Search Box */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-white/10 backdrop-blur-2xl rounded-3xl p-2 border border-white/20 shadow-2xl"
          >
            <div className="bg-white rounded-2xl p-2">
              {/* Search Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Location */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition group"
                >
                  <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition">
                    <MapPin className="text-teal-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                    <input
                      type="text"
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                      placeholder="Where to?"
                      className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 mt-0.5 placeholder:text-slate-400"
                    />
                  </div>
                </motion.div>

                {/* Property Type */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition group"
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                    <Home className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Type</p>
                    <select
                      value={searchData.propertyType}
                      onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                      className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 mt-0.5 cursor-pointer appearance-none"
                    >
                      <option value="">Any Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                  <ChevronDown size={16} className="text-slate-400" />
                </motion.div>

                {/* Price Range */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition group"
                >
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition">
                    <DollarSign className="text-emerald-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Min Price</p>
                    <input
                      type="number"
                      value={searchData.minPrice}
                      onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
                      placeholder="৳10,000"
                      className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 mt-0.5 placeholder:text-slate-400"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition group"
                >
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition">
                    <DollarSign className="text-rose-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Max Price</p>
                    <input
                      type="number"
                      value={searchData.maxPrice}
                      onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
                      placeholder="৳1,00,000"
                      className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 mt-0.5 placeholder:text-slate-400"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="w-full mt-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-700 text-white px-10 py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-xl shadow-teal-500/30 group"
              >
                <Search size={24} className="group-hover:rotate-12 transition-transform" />
                Search Properties
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
            {[
              { text: "3 Bedroom near School", icon: Home, color: "bg-blue-500" },
              { text: "Luxury Apartment", icon: Sparkles, color: "bg-purple-500" },
              { text: "Under ৳50,000", icon: DollarSign, color: "bg-emerald-500" },
              { text: "Ready to Move", icon: Calendar, color: "bg-orange-500" },
            ].map((filter, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickFilter(filter.text)}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all px-6 py-3 rounded-2xl text-white text-sm cursor-pointer border border-white/20 flex items-center gap-2.5 group"
              >
                <div className={`p-1.5 ${filter.color} rounded-lg`}>
                  <filter.icon size={14} />
                </div>
                <span className="font-medium">{filter.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}