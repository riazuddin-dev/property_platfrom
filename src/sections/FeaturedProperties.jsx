"use client";

import { Heart, MapPin, BedDouble, Bath, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProperties } from "@/services/propertyApi";
import toast from "react-hot-toast";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties(1, 6); // page 1, limit 6
        if (data?.properties) {
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        toast.error("Failed to load featured properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="loading loading-spinner loading-lg text-teal-500"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest uppercase">Featured Listings</p>
          <h2 className="text-5xl font-bold mt-3">Premium Properties</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Handpicked luxury homes and apartments from trusted owners
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property) => (
              <div 
                key={property._id} 
                className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={property.image || "https://via.placeholder.com/600x400"} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/90 dark:bg-zinc-900/90 p-3 rounded-full hover:bg-white transition">
                      <Heart size={20} className="text-red-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-teal-600 text-white px-4 py-1 rounded-full text-sm">
                    {property.propertyType || "Apartment"}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin size={18} />
                    {property.location}
                  </div>

                  <h3 className="text-2xl font-semibold mt-3 leading-tight">{property.title}</h3>

                  <p className="text-3xl font-bold text-teal-600 mt-4">
                    ৳{property.rent}
                    <span className="text-base font-normal text-slate-500">/month</span>
                  </p>

                  <div className="flex gap-6 mt-6 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <BedDouble size={20} /> {property.bedrooms || 3}
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={20} /> {property.bathrooms || 2}
                    </div>
                  </div>

                  <Link 
                    href={`/properties/${property._id}`}
                    className="mt-8 block w-full text-center py-4 bg-zinc-900 hover:bg-black text-white rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/properties" className="inline-flex items-center gap-3 text-teal-600 hover:text-teal-700 font-semibold text-lg">
            Browse All Properties <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}