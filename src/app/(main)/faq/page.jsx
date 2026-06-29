// app/faq/page.jsx
"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account on StaySphere?",
      answer: "Click on the 'Sign Up' button in the top right corner, fill in your details including name, email, and password. Verify your email address and you're ready to start exploring properties."
    },
    {
      question: "How can I list my property?",
      answer: "Log in to your account, go to your dashboard, and click 'Add Property'. Fill in all the required details including location, price, amenities, and upload high-quality photos. Our team will review and approve your listing within 24-48 hours."
    },
    {
      question: "Is it free to list a property?",
      answer: "Yes! You can list up to 3 properties for free. For unlimited listings and premium features, check out our Pro and Premium plans."
    },
    {
      question: "How do I contact property owners?",
      answer: "Once you find a property you're interested in, click the 'Contact Owner' or 'Schedule Viewing' button on the property page. You can send a direct message or request a viewing appointment."
    },
    {
      question: "Can I save properties to view later?",
      answer: "Yes! Click the heart icon on any property listing to save it to your favorites. You can access all your saved properties from your dashboard under 'My Favorites'."
    },
    {
      question: "How do I verify my identity?",
      answer: "Go to your profile settings and click 'Verify Identity'. Upload a valid government-issued ID (NID, Passport, or Driver's License). Verification usually takes 1-2 business days."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. All transactions are secured with 256-bit SSL encryption."
    },
    {
      question: "How do I report a suspicious listing?",
      answer: "If you encounter a suspicious listing, click the 'Report' button on the property page and select the reason. Our team will investigate immediately and take appropriate action."
    },
    {
      question: "Can I edit my property listing after publishing?",
      answer: "Yes, you can edit your listing anytime from your dashboard. Simply go to 'My Properties', select the property you want to edit, make your changes, and click 'Update'."
    },
    {
      question: "How do I delete my account?",
      answer: "Go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and will remove all your data, listings, and saved properties."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-6">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Find answers to common questions about StaySphere
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-teal-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-5"
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Still need help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}