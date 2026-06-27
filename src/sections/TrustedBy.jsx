"use client";

import {
  SiGoogle,
  SiAirbnb,
  SiStripe,
  SiBookingdotcom,
  SiExpedia,
  SiTripadvisor,
} from "react-icons/si";

const brands = [
  { id: 1, icon: SiGoogle, name: "Google" },
  { id: 2, icon: SiStripe, name: "Stripe" },
  { id: 3, icon: SiAirbnb, name: "Airbnb" },
  { id: 4, icon: SiBookingdotcom, name: "Booking.com" },
  { id: 5, icon: SiExpedia, name: "Expedia" },
  { id: 6, icon: SiTripadvisor, name: "TripAdvisor" },
];

const stats = [
  { number: "15K+", label: "Properties Listed" },
  { number: "8K+", label: "Happy Tenants" },
  { number: "2K+", label: "Verified Owners" },
  { number: "98%", label: "Success Rate" },
];

export default function TrustedBy() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest uppercase">Trusted Worldwide</p>
          <h2 className="text-5xl font-bold mt-3">Trusted By Thousands</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We connect tenants and property owners through a secure and trusted rental marketplace.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {brands.map((brand) => {
            const Icon = brand.icon;
            return (
              <div
                key={brand.id}
                className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-teal-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="text-5xl text-slate-400 group-hover:text-teal-500 transition-colors" />
                <p className="mt-4 font-medium text-slate-600 dark:text-slate-400">{brand.name}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-100 dark:bg-zinc-900 p-10 rounded-3xl text-center border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-5xl font-bold text-teal-600">{stat.number}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}