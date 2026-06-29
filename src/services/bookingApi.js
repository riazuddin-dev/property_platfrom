// src/services/bookingApi.js
const API = process.env.NEXT_PUBLIC_API_URL;

// Get tenant's bookings
export const getMyBookings = async () => {
  try {
    const res = await fetch(`${API}/my-bookings`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getMyBookings error:", error);
    return [];
  }
};

// Get owner's booking requests
export const getBookingRequests = async (ownerEmail) => {
  try {
    const res = await fetch(`${API}/booking-requests/${ownerEmail}`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getBookingRequests error:", error);
    return [];
  }
};

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    const res = await fetch(`${API}/booking-status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    const res = await fetch(`${API}/all-bookings`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getAllBookings error:", error);
    return [];
  }
};

// Get single booking by ID
export const getBookingById = async (id) => {
  try {
    const res = await fetch(`${API}/bookings/${id}`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getBookingById error:", error);
    return null;
  }
};