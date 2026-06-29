// src/components/shared/WhyChooseUs.jsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, CreditCard, Headphones, Users, Award, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Secure Booking",
    description: "Book properties with confidence through our secure and transparent booking system with Stripe payment.",
    color: "teal",
    bgClass: "bg-teal-500/10 dark:bg-teal-500/20",
    textClass: "text-teal-600 dark:text-teal-400",
    groupHoverClass: "group-hover:bg-teal-500/20 dark:group-hover:bg-teal-500/30"
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "Verified Properties",
    description: "Every property is carefully reviewed and verified by our team before being listed on our platform.",
    color: "emerald",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
    groupHoverClass: "group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30"
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Safe Payments",
    description: "Fast and secure online payment experience powered by Stripe, ensuring your money is always safe.",
    color: "blue",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    textClass: "text-blue-600 dark:text-blue-400",
    groupHoverClass: "group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30"
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help tenants and property owners anytime, anywhere.",
    color: "violet",
    bgClass: "bg-violet-500/10 dark:bg-violet-500/20",
    textClass: "text-violet-600 dark:text-violet-400",
    groupHoverClass: "group-hover:bg-violet-500/20 dark:group-hover:bg-violet-500/30"
  },
  {
    id: 5,
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied tenants and verified property owners building a better rental ecosystem.",
    color: "amber",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-600 dark:text-amber-400",
    groupHoverClass: "group-hover:bg-amber-500/20 dark:group-hover:bg-amber-500/30"
  },
  {
    id: 6,
    icon: Award,
    title: "Best Deals",
    description: "Get access to exclusive deals, zero hidden fees, and highly competitive rental prices in your area.",
    color: "rose",
    bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    textClass: "text-rose-600 dark:text-rose-400",
    groupHoverClass: "group-hover:bg-rose-500/20 dark:group-hover:bg-rose-500/30"
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 dark:from-teal-950/20 via-white dark:via-slate-950 to-white dark:to-slate-950 pointer-events-none" />

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
            <Sparkles size={16} /> Why Choose Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mt-2">
            A Better Way To <span className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">Rent</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            We make property renting easier, safer, and more reliable for everyone. Experience the future of real estate.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-white/10 hover:border-teal-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${item.bgClass} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl ${item.bgClass} ${item.groupHoverClass} flex items-center justify-center mb-8 transition-all duration-300`}>
                  <Icon className={item.textClass} size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="relative text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  {item.description}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.bgClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}