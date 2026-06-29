// src/sections/FeaturedProperties.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Heart } from "lucide-react";
import { getAllProperties } from "@/services/propertyApi";
import { motion } from "framer-motion";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProperties(1, 6);
      setProperties(data.properties || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">Featured Properties</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3">Handpicked premium homes for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative h-72">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition" />
                <div className="absolute top-4 right-4 bg-teal-600 text-white px-4 py-1 rounded-full text-sm">
                  {property.propertyType}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-semibold line-clamp-2">{property.title}</h3>
                <p className="flex items-center gap-2 text-slate-500 mt-2">
                  <MapPin size={18} /> {property.location}
                </p>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-3xl font-bold text-teal-600">৳{property.rent}</p>
                    <p className="text-sm text-slate-500">/month</p>
                  </div>
                  <Link 
                    href={`/properties/${property._id}`}
                    className="px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-black transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}