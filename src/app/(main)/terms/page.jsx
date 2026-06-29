// app/terms/page.jsx
"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-6">
            <FileText className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Last updated: January 2025</p>
        </motion.div>

        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <CheckCircle className="text-teal-500" size={24} />
              Agreement to Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing or using StaySphere, you agree to be bound by these Terms of Service and 
              all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Use License</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Permission is granted to temporarily use StaySphere for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, 
              and under this license you may not modify or copy the materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <AlertCircle className="text-teal-500" size={24} />
              Disclaimer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The materials on StaySphere are provided on an 'as is' basis. StaySphere makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For any questions regarding these Terms of Service, please contact us at 
              <a href="mailto:legal@staysphere.com" className="text-teal-500 hover:text-teal-600 ml-1">
                legal@staysphere.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}