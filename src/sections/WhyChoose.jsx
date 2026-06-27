"use client";

import {
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Headphones,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Book properties with confidence through our secure and transparent booking system.",
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "Verified Properties",
    description:
      "Every property is carefully reviewed and verified before being listed.",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Safe Payments",
    description:
      "Fast and secure online payment experience powered by trusted gateways.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help tenants and property owners.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-wider">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            A Better Way To Rent Properties
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            We make property renting easier, safer and more reliable
            for both tenants and property owners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/10 flex items-center justify-center">
                  <Icon className="text-teal-500" size={30} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-500">
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