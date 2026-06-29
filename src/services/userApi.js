// src/services/userApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Get Single User
export const getUserByEmail = async (email) => {
  try {
    const res = await fetchWithAuth(`${API}/user/${email}`);
    return await res.json();
  } catch (error) {
    console.error("getUserByEmail error:", error);
    return null;
  }
};

// Get User Role
export const getUserRole = async (email) => {
  try {
    const res = await fetchWithAuth(`${API}/user-role/${email}`);
    return await res.json();
  } catch (error) {
    console.error("getUserRole error:", error);
    return { role: "tenant" }; // Fallback
  }
};

// Get All Users (Admin)
export const getAllUsers = async () => {
  try {
    const res = await fetchWithAuth(`${API}/users`);
    return await res.json();
  } catch (error) {
    console.error("getAllUsers error:", error);
    return [];
  }
};

// Update User Role (Admin)
export const updateUserRole = async (id, role) => {
  try {
    const res = await fetchWithAuth(`${API}/users/role/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
    return await res.json();
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { success: false };
  }
};

// Get Dashboard Stats
export const getDashboardStats = async () => {
  try {
    const res = await fetchWithAuth(`${API}/dashboard-stats`);
    return await res.json();
  } catch (error) {
    console.error("getDashboardStats error:", error);
    return null;
  }
};