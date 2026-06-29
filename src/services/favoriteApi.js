// src/services/favoriteApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Get user's favorites
export const getFavorites = async () => {
  try {
    const res = await fetchWithAuth(`${API}/favorites`);
    return await res.json();
  } catch (error) {
    console.error("getFavorites error:", error);
    return [];
  }
};

// Add to favorites
export const addToFavorites = async (propertyId) => {
  try {
    const res = await fetchWithAuth(`${API}/favorites`, {
      method: "POST",
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
    const res = await fetchWithAuth(`${API}/favorites/${id}`, {
      method: "DELETE",
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