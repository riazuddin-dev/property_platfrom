// src/sections/FeaturedProperties.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, BedDouble, Bath, ArrowRight, Sparkles } from "lucide-react";
import { getAllProperties } from "@/services/propertyApi";
import { motion } from "framer-motion";

function PropertySkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/70">
      <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-auto h-11 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

function PropertyCard({ property, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.06, duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/20"
    >
      <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={
            property.image ||
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
          }
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
          {property.propertyType || "Property"}
        </span>
        {property.location && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <MapPin size={12} />
            <span className="line-clamp-1 max-w-[10rem]">{property.location}</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">
          {property.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {property.description ||
            property.shortDescription ||
            `Premium ${property.propertyType || "home"} available for rent in ${
              property.location || "a prime area"
            }.`}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          {property.bedrooms != null && (
            <span className="inline-flex items-center gap-1">
              <BedDouble size={14} className="text-teal-500" />
              {property.bedrooms} bed
            </span>
          )}
          {property.bathrooms != null && (
            <span className="inline-flex items-center gap-1">
              <Bath size={14} className="text-cyan-500" />
              {property.bathrooms} bath
            </span>
          )}
          <span className="ml-auto text-base font-bold text-teal-600 dark:text-teal-400">
            ৳{Number(property.rent || 0).toLocaleString()}
            <span className="text-xs font-medium text-slate-400">/mo</span>
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/properties/${property._id}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-900 text-sm font-semibold text-white transition hover:bg-teal-600 dark:border-white/10 dark:bg-white/10 dark:hover:bg-teal-600"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProperties(1, 8);
        setProperties(data.properties || []);
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <Sparkles size={14} />
              Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Handpicked homes for you
            </h2>
            <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
              Consistent cards, clear pricing, and one-click details — explore
              premium rentals ready for your next move.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-teal-500/40 hover:text-teal-700 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:text-teal-300"
          >
            View all properties
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
            <p className="text-slate-500 dark:text-slate-400">
              No featured properties available right now.
            </p>
            <Link
              href="/properties"
              className="mt-4 inline-block font-semibold text-teal-600 dark:text-teal-400"
            >
              Browse all listings
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.slice(0, 8).map((property, index) => (
              <PropertyCard
                key={property._id}
                property={property}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
