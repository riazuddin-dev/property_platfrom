"use client";

import { Heart, MapPin, BedDouble, Bath, ArrowUpRight } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    location: "Dhaka",
    price: "$450/month",
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 2,
    title: "Modern Villa",
    location: "Uttara",
    price: "$850/month",
    beds: 5,
    baths: 4,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 3,
    title: "Family House",
    location: "Savar",
    price: "$350/month",
    beds: 2,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    id: 4,
    title: "Premium Condo",
    location: "Gulshan",
    price: "$950/month",
    beds: 4,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 5,
    title: "City Apartment",
    location: "Mirpur",
    price: "$400/month",
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
  {
    id: 6,
    title: "Luxury Penthouse",
    location: "Banani",
    price: "$1200/month",
    beds: 6,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-wider">
            Featured Properties
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Explore Premium Rentals
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Handpicked properties from trusted owners with secure booking.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <button className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-3 rounded-full">
                  <Heart size={18} />
                </button>

                <span className="absolute bottom-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={16} />
                  {property.location}
                </div>

                <h3 className="mt-3 text-xl font-bold">
                  {property.title}
                </h3>

                <p className="mt-2 text-2xl font-bold text-teal-500">
                  {property.price}
                </p>

                <div className="flex gap-6 mt-5 text-slate-500">
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} />
                    {property.beds} Beds
                  </div>

                  <div className="flex items-center gap-2">
                    <Bath size={18} />
                    {property.baths} Baths
                  </div>
                </div>

                <button className="w-full mt-6 bg-slate-900 dark:bg-teal-500 text-white py-3 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                  View Details
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-2xl border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}