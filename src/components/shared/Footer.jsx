// src/components/shared/Footer.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, Mail, MapPin, Phone, Send, 
  ArrowRight, Sparkles
} from "lucide-react";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube 
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Browse Properties", href: "/properties" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const companyLinks = [
    { name: "For Owners", href: "/dashboard/owner" },
    { name: "For Tenants", href: "/dashboard/tenant" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 border-b border-white/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-400 text-sm mb-6">
              <Sparkles size={16} className="animate-pulse" />
              <span className="font-semibold">Stay Updated</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest property listings, market insights, and exclusive deals delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-5 py-4 bg-slate-900/50 backdrop-blur-xl border border-white/10 focus:border-teal-500/50 rounded-2xl outline-none text-white placeholder:text-slate-500 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30 transition-all"
              >
                {subscribed ? (
                  <>
                    <span>Subscribed!</span>
                    <Heart size={18} className="fill-white" />
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="size-11 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-teal-500/30"
              >
                S
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter text-white">
                Stay<span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Sphere</span>
              </h2>
            </div>

            <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-8">
              Premium property rental platform connecting discerning tenants with exceptional homes across Bangladesh. Your dream home awaits.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <MapPin size={16} className="text-teal-400" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Mail size={16} className="text-teal-400" />
                </div>
                <a href="mailto:support@staysphere.com" className="hover:text-teal-400 transition">
                  support@staysphere.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Phone size={16} className="text-teal-400" />
                </div>
                <a href="tel:+8801234567890" className="hover:text-teal-400 transition">
                  +880 1234-567890
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-teal-500/30 rounded-xl text-slate-400 hover:text-teal-400 transition-all flex items-center justify-center"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <h3 className="font-bold text-white mb-6 text-lg">Platform</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <h3 className="font-bold text-white mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} StaySphere. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Made with</span>
              <Heart className="text-red-500 fill-red-500 animate-pulse" size={16} />
              <span>for better living</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}