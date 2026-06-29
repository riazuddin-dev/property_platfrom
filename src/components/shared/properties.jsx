"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Heart, MapPin, BedDouble, Bath, 
  X, Sparkles, Home, Building2, Castle, ArrowRight, Filter
} from "lucide-react";
import { getAllProperties } from "@/services/propertyApi";

// Skeleton Loader Component
const PropertyCardSkeleton = () => (
  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden animate-pulse">
    <div className="h-72 bg-slate-800" />
    <div className="p-7 space-y-4">
      <div className="flex justify-between">
        <div className="h-6 bg-slate-800 rounded w-2/3" />
        <div className="h-6 bg-slate-800 rounded w-1/4" />
      </div>
      <div className="h-4 bg-slate-800 rounded w-1/2" />
      <div className="flex gap-6 mt-6">
        <div className="h-5 bg-slate-800 rounded w-16" />
        <div className="h-5 bg-slate-800 rounded w-16" />
      </div>
      <div className="h-12 bg-slate-800 rounded-2xl mt-8" />
    </div>
  </div>
);

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  // Filter States
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Load properties with backend filtering
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        
        // ✅ Correct API call with proper parameters
        const result = await getAllProperties(page, 6, {
          search,
          propertyType,
          minPrice: minPrice || 0,
          maxPrice: maxPrice || 999999,
          sort: sortOrder || "default",
        });
        
        setProperties(result.properties || []);
        setTotalPages(result.totalPages || 1);
        setTotalProperties(result.total || 0);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      loadProperties();
    }, search ? 500 : 0);

    return () => clearTimeout(timer);
  }, [page, search, propertyType, minPrice, maxPrice, sortOrder]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, propertyType, minPrice, maxPrice, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("");
  };

  const hasActiveFilters = search || propertyType || minPrice || maxPrice || sortOrder;

  const propertyTypeOptions = [
    { value: "Apartment", label: "Apartment", icon: Building2 },
    { value: "House", label: "House", icon: Home },
    { value: "Villa", label: "Villa", icon: Castle },
    { value: "Studio", label: "Studio", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-400 text-sm mb-6">
            <Sparkles size={16} /> Explore Premium Properties
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Discover Your <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Dream Home</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Handpicked premium properties across Bangladesh, tailored to your lifestyle
          </p>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12"
        >
          {/* Main Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, location, or keyword..."
                className="w-full pl-14 pr-5 py-4 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-2xl outline-none text-white placeholder:text-slate-500 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 rounded-2xl text-teal-400 font-semibold transition-all md:w-auto"
            >
              <Filter size={20} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-white/10">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                        Property Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white cursor-pointer transition-all"
                      >
                        <option value="">All Types</option>
                        {propertyTypeOptions.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Min Price */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                        Min Price
                      </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="৳10,000"
                        className="w-full px-5 py-3.5 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white placeholder:text-slate-500 transition-all"
                      />
                    </div>

                    {/* Max Price */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                        Max Price
                      </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="৳1,00,000"
                        className="w-full px-5 py-3.5 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white placeholder:text-slate-500 transition-all"
                      />
                    </div>

                    {/* Sort Order */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                        Sort By
                      </label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white cursor-pointer transition-all"
                      >
                        <option value="">Default</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={clearFilters}
                      className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-red-400 font-medium transition-all"
                    >
                      <X size={16} />
                      Clear All Filters
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center justify-between"
          >
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{properties.length}</span> of{" "}
              <span className="text-teal-400 font-semibold">{totalProperties}</span> properties
            </p>
          </motion.div>
        )}

        {/* Properties Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl"
          >
            <div className="inline-flex p-6 bg-slate-800/50 rounded-full mb-6">
              <Search className="text-slate-500" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">No properties found</h3>
            <p className="text-slate-400 text-lg mb-6">Try adjusting your filters or search terms</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 rounded-xl text-teal-400 font-semibold transition-all"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={property.image || property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-md border ${
                      property.status === "approved" 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}>
                      {property.status?.toUpperCase()}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group/fav">
                    <Heart size={18} className="text-white group-hover/fav:text-red-400 group-hover/fav:fill-red-400 transition-all" />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                      <p className="text-xs text-slate-400">Starting from</p>
                      <p className="text-xl font-bold text-teal-400">৳{property.rent?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-white line-clamp-2 mb-3 group-hover:text-teal-400 transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-400 mb-6">
                    <MapPin size={16} className="text-teal-400" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Features */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="p-2 bg-teal-500/10 rounded-lg">
                        <BedDouble size={16} className="text-teal-400" />
                      </div>
                      <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Bath size={16} className="text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                    </div>
                  </div>

                  {/* View Details Button - ✅ Fixed path */}
                  <Link
                    href={`/properties/${property._id}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-teal-500/20 group/btn"
                  >
                    View Details
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-4 mt-16"
          >
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white font-semibold transition-all"
            >
              ← Previous
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                    page === i + 1
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30"
                      : "bg-slate-900/50 border border-white/10 text-slate-400 hover:border-teal-500/30 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white font-semibold transition-all"
            >
              Next →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}