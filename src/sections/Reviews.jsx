"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=1",
    review:
      "StaySphere made finding my apartment incredibly easy. The booking process was smooth and secure.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Property Owner",
    image: "https://i.pravatar.cc/150?img=3",
    review:
      "I listed my property and received bookings within days. Excellent platform and support.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "Verified properties and transparent pricing gave me confidence to rent through this platform.",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-wider">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            What Our Users Say
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Thousands of tenants and owners trust StaySphere for their rental needs.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-5 text-slate-600 dark:text-slate-400 leading-7">
                "{review.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {review.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}