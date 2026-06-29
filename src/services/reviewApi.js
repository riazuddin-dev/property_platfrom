// src/services/reviewApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Add new review
export const addReview = async (reviewData) => {
  try {
    const res = await fetchWithAuth(`${API}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
    return await res.json();
  } catch (error) {
    console.error("addReview error:", error);
    return { success: false };
  }
};

// Get property reviews (Public)
export const getPropertyReviews = async (propertyId) => {
  try {
    const res = await fetchWithAuth(`${API}/reviews/${propertyId}`);
    return await res.json();
  } catch (error) {
    console.error("getPropertyReviews error:", error);
    return [];
  }
};

// Get user's reviews
export const getUserReviews = async (userEmail) => {
  try {
    const allReviews = await getPropertyReviews(""); // Get all reviews
    return allReviews.filter(review => review.reviewerEmail === userEmail);
  } catch (error) {
    console.error("getUserReviews error:", error);
    return [];
  }
};