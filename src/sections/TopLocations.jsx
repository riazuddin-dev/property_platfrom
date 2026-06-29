// src/components/shared/Reviews.jsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=1",
    review: "StaySphere made finding my dream apartment incredibly easy. The booking process was smooth and completely secure.",
    rating: 5,
    location: "Gulshan, Dhaka"
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Property Owner",
    image: "https://i.pravatar.cc/150?img=3",
    review: "I listed my property and received bookings within days. Excellent platform, great support and professional service.",
    rating: 5,
    location: "Banani, Dhaka"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=5",
    review: "Verified properties and transparent pricing gave me full confidence to rent through this platform.",
    rating: 5,
    location: "Uttara, Dhaka"
  },
  {
    id: 4,
    name: "Rahim Khan",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Best rental experience I've ever had. Fast response from owners and smooth payment process.",
    rating: 5,
    location: "Dhanmondi, Dhaka"
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Reviews() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50/50 dark:from-teal-950/20 via-slate-50 dark:via-slate-950 to-slate-50 dark:to-slate-950 pointer-events-none" />

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
            <Sparkles size={16} /> Testimonials
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mt-2">
            What Our Users <span className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">Say</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Thousands of tenants and owners trust StaySphere for their rental needs.
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-slate-600 dark:text-slate-400 font-semibold">
              4.9/5 from <span className="text-teal-600 dark:text-teal-400">2,500+</span> reviews
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:border-teal-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote Icon Decoration */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={48} className="text-teal-500" />
              </div>

              {/* Rating Stars */}
              <div className="relative flex gap-1 text-amber-400 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <Star size={18} fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              {/* Review Text */}
              <p className="relative text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
                "{review.review}"
              </p>

              {/* User Info */}
              <div className="relative flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-teal-500/30 group-hover:border-teal-500 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 dark:bg-teal-500/20 px-2 py-0.5 rounded-full">
                      {review.role}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500 truncate">
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Ready to join our happy community?
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl">
            Get Started Today
            <Sparkles size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}