"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=1",
    review: "StaySphere made finding my dream apartment incredibly easy. The booking process was smooth and completely secure.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Property Owner",
    image: "https://i.pravatar.cc/150?img=3",
    review: "I listed my property and received bookings within days. Excellent platform, great support and professional service.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=5",
    review: "Verified properties and transparent pricing gave me full confidence to rent through this platform.",
    rating: 5
  },
  {
    id: 4,
    name: "Rahim Khan",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Best rental experience I've ever had. Fast response from owners and smooth payment process.",
    rating: 5
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest uppercase">Testimonials</p>
          <h2 className="text-5xl font-bold mt-3">What Our Users Say</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Thousands of tenants and owners trust StaySphere for their rental needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={22} fill="currentColor" />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                "{review.review}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
