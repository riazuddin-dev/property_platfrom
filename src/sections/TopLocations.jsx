"use client";

import { ArrowRightToLine } from "lucide-react";
import Link from "next/link";

const locations = [
  {
    id: 1,
    name: "Gulshan",
    properties: "1,250+ Properties",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
    description: "Luxury & Modern Living"
  },
  {
    id: 2,
    name: "Uttara",
    properties: "980+ Properties",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
    description: "Family Friendly Area"
  },
  {
    id: 3,
    name: "Banani",
    properties: "750+ Properties",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Premium Residential"
  },
  {
    id: 4,
    name: "Mirpur",
    properties: "1,450+ Properties",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    description: "Affordable & Spacious"
  },
];

export default function TopLocations() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest uppercase">Popular Areas</p>
          <h2 className="text-5xl font-bold mt-3">Top Locations in Dhaka</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Explore the most sought-after neighborhoods with thousands of verified properties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group relative overflow-hidden rounded-3xl h-[380px] cursor-pointer"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-bold tracking-tight">{location.name}</h3>
                <p className="text-lg mt-1 opacity-90">{location.properties}</p>
                <p className="text-sm mt-3 opacity-75">{location.description}</p>
              </div>

              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 rounded-3xl" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-3 text-teal-600 hover:text-teal-700 font-semibold text-lg"
          >
            Explore All Locations <ArrowRightToLine size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}