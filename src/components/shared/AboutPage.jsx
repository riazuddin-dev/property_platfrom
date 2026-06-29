
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Home, Users, ShieldCheck, Handshake, MapPin, Award, 
  Target, Eye, Sparkles, ArrowRight 
} from "lucide-react";

  export const AboutPage = () => {
  const stats = [
    { number: "10K+", label: "Premium Properties", icon: Home },
    { number: "50K+", label: "Happy Tenants", icon: Users },
    { number: "5K+", label: "Trusted Owners", icon: Handshake },
    { number: "100+", label: "Cities Covered", icon: MapPin },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Secure & Transparent",
      description: "Every transaction is encrypted and all listings are strictly verified for your absolute peace of mind.",
    },
    {
      icon: Handshake,
      title: "Trust & Reliability",
      description: "We bridge the gap between tenants and owners through a reliable, honest, and fair platform.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Our rigorous quality checks ensure you only get the best rental experience, every single time.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-400 text-sm mb-8"
          >
            <Sparkles size={16} /> About StaySphere
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Redefining the Way You <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Find Your Home
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We are building a transparent, secure, and trustworthy rental marketplace 
            that connects tenants with their dream homes and owners with reliable renters.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center group hover:border-teal-500/30 transition-all duration-300"
            >
              <div className="inline-flex p-4 bg-teal-500/10 rounded-2xl mb-4 group-hover:bg-teal-500/20 transition-colors">
                <stat.icon className="text-teal-400" size={28} />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.number}
              </h3>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-3xl p-10 hover:border-teal-500/40 transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-500 rounded-xl">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              To simplify the rental experience by providing a transparent, secure, and user-friendly 
              platform. We believe everyone deserves a place they can truly call home, without the 
              stress of hidden fees or unreliable listings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-10 hover:border-purple-500/40 transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Eye className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              To become the world's most trusted rental marketplace. We envision a future where 
              technology eliminates the friction of renting and creates meaningful, long-lasting 
              connections between people and their perfect spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our Core <span className="text-teal-400">Values</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The principles that guide every decision we make at StaySphere.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-teal-500/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/20">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Meet the <span className="text-teal-400">Team</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The passionate minds working behind the scenes to make your rental journey seamless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>
                <div className="p-6 -mt-16 relative">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-teal-400 font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
              Join thousands of happy tenants and owners who trust StaySphere for their rental needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow"
              >
                Browse Properties <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-teal-700/50 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-teal-700/70 transition-colors"
              >
                List Your Property
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// export default AboutPage;