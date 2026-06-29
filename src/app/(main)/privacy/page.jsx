// app/privacy/page.jsx
"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-6">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Last updated: January 2025</p>
        </motion.div>

        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <Eye className="text-teal-500" size={24} />
              Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect information you provide directly to us, including your name, email address, 
              phone number, and any other information you choose to provide when using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <Lock className="text-teal-500" size={24} />
              How We Use Your Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, 
              to process your transactions, and to send you related information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <Database className="text-teal-500" size={24} />
              Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at 
              <a href="mailto:privacy@staysphere.com" className="text-teal-500 hover:text-teal-600 ml-1">
                privacy@staysphere.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}