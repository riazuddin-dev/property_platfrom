"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getFavorites, removeFavorite } from "@/services/favoriteApi";
import Swal from "sweetalert2";
import Link from "next/link";

export default function FavoritesPage() {
  const { data: session } = authClient.useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      if (!session?.user?.email) return;
      try {
        const result = await getFavorites();
        setFavorites(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [session]);

  const filteredFavorites = favorites.filter((fav) =>
    fav.propertyTitle?.toLowerCase().includes(search.toLowerCase()) ||
    fav.location?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove from Favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    });

    if (!result.isConfirmed) return;

    const res = await removeFavorite(id);
    if (res.deletedCount > 0) {
      Swal.fire("Removed!", "Property removed from favorites.", "success");
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Favorites ❤️</h1>
          <p className="text-slate-500">Saved properties for later</p>
        </div>
        <input
          type="text"
          placeholder="Search favorites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-80"
        />
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl">
          <div className="text-6xl mb-6">🤍</div>
          <h3 className="text-2xl font-semibold">No Favorites Yet</h3>
          <p className="text-slate-500 mt-3">Start adding properties you love!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={fav.propertyImage}
                alt={fav.propertyTitle}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl">{fav.propertyTitle}</h3>
                <p className="text-slate-500 mt-1">📍 {fav.location}</p>
                <p className="text-2xl font-bold text-teal-600 mt-4">
                  ৳{fav.rent}
                </p>

                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/properties/${fav.propertyId}`}
                    className="flex-1 btn btn-outline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="flex-1 btn btn-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}