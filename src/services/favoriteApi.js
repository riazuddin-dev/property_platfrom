// src/services/favoriteApi.js
const API = process.env.NEXT_PUBLIC_API_URL;

// Get user's favorites
export const getFavorites = async () => {
  try {
    const res = await fetch(`${API}/favorites`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getFavorites error:", error);
    return [];
  }
};

// Add to favorites
export const addToFavorites = async (propertyId) => {
  try {
    const res = await fetch(`${API}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ propertyId }),
    });
    return await res.json();
  } catch (error) {
    console.error("addToFavorites error:", error);
    return { success: false };
  }
};

// Remove from favorites
export const removeFromFavorites = async (id) => {
  try {
    const res = await fetch(`${API}/favorites/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("removeFromFavorites error:", error);
    return { success: false };
  }
};

// Check if property is in favorites
export const isFavorite = async (propertyId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.propertyId === propertyId);
  } catch (error) {
    console.error("isFavorite error:", error);
    return false;
  }
};