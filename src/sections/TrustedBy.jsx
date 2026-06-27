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
  {
    id: 1,
    icon: SiGoogle,
    name: "Google",
  },
  {
    id: 2,
    icon: SiStripe,
    name: "Stripe",
  },
  {
    id: 3,
    icon: SiAirbnb,
    name: "Airbnb",
  },
  {
    id: 4,
    icon: SiBookingdotcom,
    name: "Booking",
  },
  {
    id: 5,
    icon: SiExpedia,
    name: "Expedia",
  },
  {
    id: 6,
    icon: SiTripadvisor,
    name: "TripAdvisor",
  },
];

export default function TrustedBy() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-wider">
            Trusted Worldwide
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Trusted By Thousands
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            We connect tenants and property owners through a
            secure and trusted rental marketplace.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-14">
          {brands.map((brand) => {
            const Icon = brand.icon;

            return (
              <div
                key={brand.id}
                className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300"
              >
                <Icon className="text-4xl text-slate-400 group-hover:text-teal-500 transition" />

                <h3 className="mt-3 font-medium">
                  {brand.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-8 text-center">
            <h3 className="text-4xl font-bold text-teal-500">
              15K+
            </h3>

            <p className="mt-2 text-slate-500">
              Properties Listed
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-8 text-center">
            <h3 className="text-4xl font-bold text-teal-500">
              8K+
            </h3>

            <p className="mt-2 text-slate-500">
              Happy Tenants
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-8 text-center">
            <h3 className="text-4xl font-bold text-teal-500">
              2K+
            </h3>

            <p className="mt-2 text-slate-500">
              Trusted Owners
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-8 text-center">
            <h3 className="text-4xl font-bold text-teal-500">
              98%
            </h3>

            <p className="mt-2 text-slate-500">
              Success Rate
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}