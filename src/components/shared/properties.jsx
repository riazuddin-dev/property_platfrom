// src/components/shared/properties.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Heart, MapPin, BedDouble, Bath } from "lucide-react";
import { getAllProperties } from "@/services/propertyApi";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const result = await getAllProperties(page, 6);
        setProperties(result.properties || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, [page]);

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        const searchMatch = 
          property.title?.toLowerCase().includes(search.toLowerCase()) ||
          property.location?.toLowerCase().includes(search.toLowerCase());

        const typeMatch = propertyType === "all" || property.propertyType === propertyType;

        let priceMatch = true;
        switch (priceFilter) {
          case "0-20000": priceMatch = property.rent < 20000; break;
          case "20000-50000": priceMatch = property.rent >= 20000 && property.rent <= 50000; break;
          case "50000+": priceMatch = property.rent > 50000; break;
          default: priceMatch = true;
        }

        return searchMatch && typeMatch && priceMatch;
      })
      .sort((a, b) => {
        if (sortOrder === "low-high") return a.rent - b.rent;
        if (sortOrder === "high-low") return b.rent - a.rent;
        return 0;
      });
  }, [properties, search, propertyType, priceFilter, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">Discover Properties</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">Handpicked premium homes across Bangladesh</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <SlidersHorizontal className="text-teal-500" />
            <h2 className="text-2xl font-semibold">Filters</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-5 top-4 text-slate-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or location..."
                className="w-full pl-14 py-4 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-teal-500 rounded-2xl outline-none"
              />
            </div>

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="select select-bordered w-full rounded-2xl py-4"
            >
              <option value="all">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="select select-bordered w-full rounded-2xl py-4"
            >
              <option value="all">All Prices</option>
              <option value="0-20000">Under ৳20,000</option>
              <option value="20000-50000">৳20,000 - 50,000</option>
              <option value="50000+">Above ৳50,000</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered w-full rounded-2xl py-4"
            >
              <option value="default">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-3xl font-semibold">No properties found</h3>
            <p className="text-slate-500 mt-3">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 text-sm font-medium rounded-2xl ${
                      property.status === "approved" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold line-clamp-2">{property.title}</h3>
                    <p className="text-2xl font-bold text-teal-600">৳{property.rent}</p>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <MapPin size={18} />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex gap-6 mt-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <BedDouble size={20} /> {property.bedrooms}
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={20} /> {property.bathrooms}
                    </div>
                  </div>

                  <Link
                    href={`/properties/${property._id}`}
                    className="mt-8 block w-full text-center py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-semibold transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-outline px-8"
          >
            ← Previous
          </button>
          <span className="font-medium text-lg">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn btn-outline px-8"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}