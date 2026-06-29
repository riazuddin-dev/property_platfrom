// src/services/authApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// ❌ generateJWT removed - Better Auth handles authentication

// Logout user (clear Better Auth cookies)
export const logoutUser = async () => {
  try {
    const res = await fetchWithAuth(`${API}/logout`, {
      method: "POST",
    });
    return await res.json();
  } catch (error) {
    console.error("logoutUser error:", error);
    return { success: false };
  }
};

// Save user to database after registration (public)
export const saveUser = async (userData) => {
  try {
    const response = await fetchWithAuth(`${API}/save-user`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Save user error:", error);
    throw error;
  }
};