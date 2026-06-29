// src/app/dashboard/tenant/favorites/page.jsx
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getFavorites, removeFromFavorites } from "@/services/favoriteApi";
import Swal from "sweetalert2";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Trash2, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const { data: session } = authClient.useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      loadFavorites();
    }
  }, [session]);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      console.log("Favorites API Response:", data); // Debug log
      
      // ✅ Ensure data is an array
      if (Array.isArray(data)) {
        setFavorites(data);
      } else if (data && Array.isArray(data.favorites)) {
        // If API returns { favorites: [...] }
        setFavorites(data.favorites);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    const result = await Swal.fire({
      title: "Remove from Favorites?",
      text: "This property will be removed from your favorites",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await removeFromFavorites(id);
        // ✅ Remove from local state
        setFavorites(favorites.filter(fav => fav._id !== id));
        Swal.fire({
          title: "Removed!",
          text: "Property removed from favorites",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error removing favorite:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to remove from favorites",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Heart className="text-rose-500" fill="currentColor" />
            My Favorites
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Your saved properties ({favorites.length})
          </p>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10"
          >
            <Home className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Start saving properties you love!
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition"
            >
              <Home size={20} />
              Browse Properties
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite, index) => (
              <motion.div
                key={favorite._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 group"
              >
                 {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={favorite.propertyImage || favorite.propertyId?.image || favorite.propertyId?.propertyImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"}
                    alt={favorite.propertyTitle || favorite.propertyId?.title || favorite.propertyId?.propertyTitle || "Property"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleRemoveFavorite(favorite._id)}
                      className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg"
                      title="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {favorite.propertyTitle || favorite.propertyId?.title || favorite.propertyId?.propertyTitle || "Untitled Property"}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                    <MapPin size={16} />
                    <span className="text-sm">{favorite.location || favorite.propertyId?.location || "Unknown Location"}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{favorite.bedrooms ?? favorite.propertyId?.bedrooms ?? 'N/A'} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{favorite.bathrooms ?? favorite.propertyId?.bathrooms ?? 'N/A'} Baths</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                    <p className="text-2xl font-bold text-teal-500">
                      ৳{(favorite.rent ?? favorite.propertyId?.rent)?.toLocaleString() || 'N/A'}
                      <span className="text-sm text-slate-500 font-normal">/month</span>
                    </p>
                    <Link
                      href={`/properties/${favorite.propertyId?._id || favorite.propertyId}`}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold text-sm transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}