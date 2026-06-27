"use client";

import { ShieldCheck, BadgeCheck, CreditCard, Headphones, Users, Award } from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Secure Booking",
    description: "Book properties with confidence through our secure and transparent booking system with Stripe payment.",
    color: "teal"
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "Verified Properties",
    description: "Every property is carefully reviewed and verified by our team before being listed.",
    color: "emerald"
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Safe Payments",
    description: "Fast and secure online payment experience powered by Stripe.",
    color: "blue"
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help tenants and property owners.",
    color: "violet"
  },
  {
    id: 5,
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied tenants and verified property owners.",
    color: "amber"
  },
  {
    id: 6,
    icon: Award,
    title: "Best Deals",
    description: "Get access to exclusive deals and competitive rental prices.",
    color: "rose"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest uppercase">Why Choose Us</p>
          <h2 className="text-5xl font-bold mt-3">A Better Way To Rent</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We make property renting easier, safer, and more reliable for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 hover:border-teal-500 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition">
                  <Icon className="text-teal-600" size={36} />
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}