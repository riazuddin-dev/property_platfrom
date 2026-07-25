// src/services/bookingApi.js
import { fetchWithAuth } from "@/utils/api";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getMyBookings = async () => {
  try {
    const res = await fetchWithAuth(`${API}/my-bookings`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to load bookings");
    }
    return await res.json();
  } catch (error) {
    console.error("getMyBookings error:", error);
    return [];
  }
};

export const getBookingRequests = async (ownerEmail) => {
  try {
    const res = await fetchWithAuth(`${API}/booking-requests/${ownerEmail}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to load requests");
    }
    return await res.json();
  } catch (error) {
    console.error("getBookingRequests error:", error);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  const res = await fetchWithAuth(`${API}/bookings`, {
    method: "POST",
    body: JSON.stringify(bookingData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetchWithAuth(`${API}/booking-status/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Status update failed");
  }
  return data;
};

export const getAllBookings = async () => {
  try {
    const res = await fetchWithAuth(`${API}/all-bookings`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("getAllBookings error:", error);
    return [];
  }
};
