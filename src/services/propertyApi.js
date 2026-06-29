// src/services/propertyApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Get all properties (Public with filters)
export const getAllProperties = async (page = 1, limit = 6, filters = {}) => {
  try {
    const {
      search = "",
      propertyType = "all",
      minPrice = 0,
      maxPrice = 999999,
      sort = "default",
    } = filters;

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      propertyType,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      sort,
    });

    const res = await fetchWithAuth(`${API}/properties?${params.toString()}`);
    return await res.json();
  } catch (error) {
    console.error("getAllProperties error:", error);
    return { properties: [], total: 0, page: 1, totalPages: 0 };
  }
};

// Get single property (Public)
export const getPropertyById = async (id) => {
  try {
    const res = await fetchWithAuth(`${API}/property/${id}`);
    return await res.json();
  } catch (error) {
    console.error("getPropertyById error:", error);
    return null;
  }
};

// Add new property (Owner only)
export const addProperty = async (propertyData) => {
  try {
    const res = await fetchWithAuth(`${API}/properties`, {
      method: "POST",
      body: JSON.stringify(propertyData),
    });
    return await res.json();
  } catch (error) {
    console.error("addProperty error:", error);
    return { success: false };
  }
};

// Update property (Owner only)
export const updateProperty = async (id, updatedData) => {
  try {
    const res = await fetchWithAuth(`${API}/property/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (error) {
    console.error("updateProperty error:", error);
    return { success: false };
  }
};

// Delete property (Owner only)
export const deleteProperty = async (id) => {
  try {
    const res = await fetchWithAuth(`${API}/properties/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("deleteProperty error:", error);
    return { success: false };
  }
};

// Get owner's properties
export const getMyProperties = async (email) => {
  try {
    const res = await fetchWithAuth(`${API}/my-properties/${email}`);
    return await res.json();
  } catch (error) {
    console.error("getMyProperties error:", error);
    return [];
  }
};

// Get all properties (Admin only)
export const getAllPropertiesAdmin = async () => {
  try {
    const res = await fetchWithAuth(`${API}/all-properties`);
    return await res.json();
  } catch (error) {
    console.error("getAllPropertiesAdmin error:", error);
    return [];
  }
};

// Update property status (Admin only)
export const updatePropertyStatus = async (id, status, feedback = "") => {
  try {
    const res = await fetchWithAuth(`${API}/property-status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, feedback }),
    });
    return await res.json();
  } catch (error) {
    console.error("updatePropertyStatus error:", error);
    return { success: false };
  }
};
