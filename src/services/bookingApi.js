const API =
  process.env.NEXT_PUBLIC_API_URL;

export const addBooking =
  async (bookingData) => {
    const res = await fetch(
      `${API}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          bookingData
        ),
      }
    );

    return res.json();
  };

export const getMyBookings =
  async () => {
    const res = await fetch(
      `${API}/my-bookings`,
      {
        credentials: "include",
      }
    );

    return res.json();
  };

export const getAllBookings =
  async () => {
    const res = await fetch(
      `${API}/all-bookings`,
      {
        credentials: "include",
      }
    );

    return res.json();
  };

export const getBookingRequests =
  async (ownerEmail) => {
    const res = await fetch(
      `${API}/booking-requests/${ownerEmail}`,
      {
        credentials: "include",
      }
    );

    return res.json();
  };

export const updateBookingStatus =
  async (id, status) => {
    const res = await fetch(
      `${API}/booking-status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status,
        }),
      }
    );

    return res.json();
  };