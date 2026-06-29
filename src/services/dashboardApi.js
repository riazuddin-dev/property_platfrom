// src/services/dashboardApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Get dashboard stats based on user role
export const getDashboardStats = async () => {
  try {
    const res = await fetchWithAuth(`${API}/dashboard-stats`);
    return await res.json();
  } catch (error) {
    console.error("getDashboardStats error:", error);
    return null;
  }
};

// Get admin dashboard stats
export const getAdminStats = async () => {
  try {
    const stats = await getDashboardStats();
    if (stats?.role === "admin") {
      return stats;
    }
    return null;
  } catch (error) {
    console.error("getAdminStats error:", error);
    return null;
  }
};

// Get owner dashboard stats
export const getOwnerStats = async () => {
  try {
    const stats = await getDashboardStats();
    if (stats?.role === "owner") {
      return stats;
    }
    return null;
  } catch (error) {
    console.error("getOwnerStats error:", error);
    return null;
  }
};

// Get tenant dashboard stats
export const getTenantStats = async () => {
  try {
    const stats = await getDashboardStats();
    if (stats?.role === "tenant") {
      return stats;
    }
    return null;
  } catch (error) {
    console.error("getTenantStats error:", error);
    return null;
  }
};