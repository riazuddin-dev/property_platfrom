// src/components/shared/TrustedBy.jsx
"use client";

import { motion } from "framer-motion";
import {
  SiGoogle,
  SiAirbnb,
  SiStripe,
  SiBookingdotcom,
  SiExpedia,
  SiTripadvisor,
} from "react-icons/si";
import { Sparkles, TrendingUp, Users, Award, Home } from "lucide-react";

const brands = [
  { id: 1, icon: SiGoogle, name: "Google" },
  { id: 2, icon: SiStripe, name: "Stripe" },
  { id: 3, icon: SiAirbnb, name: "Airbnb" },
  { id: 4, icon: SiBookingdotcom, name: "Booking.com" },
  { id: 5, icon: SiExpedia, name: "Expedia" },
  { id: 6, icon: SiTripadvisor, name: "TripAdvisor" },
];

const stats = [
  { 
    number: "15K+", 
    label: "Properties Listed",
    icon: Home,
    color: "teal",
    bgClass: "bg-teal-500/10 dark:bg-teal-500/20",
    textClass: "text-teal-600 dark:text-teal-400",
    numberClass: "from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400"
  },
  { 
    number: "8K+", 
    label: "Happy Tenants",
    icon: Users,
    color: "emerald",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
    numberClass: "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400"
  },
  { 
    number: "2K+", 
    label: "Verified Owners",
    icon: Award,
    color: "violet",
    bgClass: "bg-violet-500/10 dark:bg-violet-500/20",
    textClass: "text-violet-600 dark:text-violet-400",
    numberClass: "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400"
  },
  { 
    number: "98%", 
    label: "Success Rate",
    icon: TrendingUp,
    color: "amber",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-600 dark:text-amber-400",
    numberClass: "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400"
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function TrustedBy() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-50/50 dark:from-teal-950/20 via-slate-50 dark:via-slate-950 to-slate-50 dark:to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-teal-500/10 dark:bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-600 dark:text-teal-400 text-sm mb-6 font-semibold">
            <Sparkles size={16} /> Trusted Worldwide
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mt-2">
            Trusted By <span className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">Thousands</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            We connect tenants and property owners through a secure and trusted rental marketplace.
          </p>
        </motion.div>

        {/* Brand Logos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        >
          {brands.map((brand) => {
            const Icon = brand.icon;
            return (
              <motion.div
                key={brand.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl hover:border-teal-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative">
                  <Icon className="text-5xl text-slate-400 dark:text-slate-500 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-all duration-300 group-hover:scale-110" />
                </div>

                {/* Brand Name */}
                <p className="relative mt-4 font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {brand.name}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center hover:border-teal-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${stat.bgClass} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative inline-flex p-4 ${stat.bgClass} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={stat.textClass} size={28} strokeWidth={1.5} />
                </div>

                {/* Number with Gradient */}
                <h3 className={`relative text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.numberClass} bg-clip-text text-transparent mb-3 tracking-tight`}>
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="relative text-slate-600 dark:text-slate-400 font-semibold text-base">
                  {stat.label}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.numberClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}