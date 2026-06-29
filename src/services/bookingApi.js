// src/services/bookingApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

// Get tenant's bookings
export const getMyBookings = async () => {
  try {
    const res = await fetchWithAuth(`${API}/my-bookings`);
    return await res.json();
  } catch (error) {
    console.error("getMyBookings error:", error);
    return [];
  }
};

// Get owner's booking requests
export const getBookingRequests = async (ownerEmail) => {
  try {
    const res = await fetchWithAuth(`${API}/booking-requests/${ownerEmail}`);
    return await res.json();
  } catch (error) {
    console.error("getBookingRequests error:", error);
    return [];
  }
};

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const res = await fetchWithAuth(`${API}/bookings`, {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
    return await res.json();
  } catch (error) {
    console.error("createBooking error:", error);
    return { success: false };
  }
};

// Update booking status (Owner only)
export const updateBookingStatus = async (id, status) => {
  try {
    const res = await fetchWithAuth(`${API}/booking-status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error) {
    console.error("updateBookingStatus error:", error);
    return { success: false };
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async () => {
  try {
    const res = await fetchWithAuth(`${API}/all-bookings`);
    return await res.json();
  } catch (error) {
    console.error("getAllBookings error:", error);
    return [];
  }
};

// Get single booking by ID
export const getBookingById = async (id) => {
  try {
    const res = await fetchWithAuth(`${API}/bookings/${id}`);
    return await res.json();
  } catch (error) {
    console.error("getBookingById error:", error);
    return null;
  }
};