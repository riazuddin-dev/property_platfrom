// app/help/page.jsx
"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, Mail, Phone, BookOpen, Video } from "lucide-react";

export default function HelpPage() {
  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using StaySphere",
      link: "#"
    },
    {
      icon: MessageSquare,
      title: "Account Support",
      description: "Manage your account settings and preferences",
      link: "#"
    },
    {
      icon: HelpCircle,
      title: "Property Listings",
      description: "How to list and manage properties",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-6">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions and get help with using StaySphere
          </p>
        </motion.div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@staysphere.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 rounded-2xl font-semibold hover:bg-teal-50 transition-all"
            >
              <Mail size={20} />
              Email Support
            </a>
            <a 
              href="tel:+8801234567890"
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-700 text-white rounded-2xl font-semibold hover:bg-teal-800 transition-all"
            >
              <Phone size={20} />
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}