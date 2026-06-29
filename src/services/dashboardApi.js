// src/services/dashboardApi.js
const API = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats = async () => {
  try {
    console.log("📡 Fetching dashboard stats...");
    
    const res = await fetch(`${API}/dashboard-stats`, {
      credentials: "include", // ✅ IMPORTANT!
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📊 Dashboard stats response status:", res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Dashboard stats error:", error);
      throw new Error(error.message);
    }
    
    const data = await res.json();
    console.log("✅ Dashboard stats:", data);
    return data;
  } catch (error) {
    console.error("❌ getDashboardStats error:", error);
    return null;
  }
};

// src/services/bookingApi.js
export const getMyBookings = async () => {
  try {
    console.log("📡 Fetching bookings...");
    
    const res = await fetch(`${API}/my-bookings`, {
      credentials: "include", // ✅ IMPORTANT!
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📚 Bookings response status:", res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Bookings error:", error);
      throw new Error(error.message);
    }
    
    const data = await res.json();
    console.log("✅ Bookings data:", Array.isArray(data) ? `${data.length} bookings` : data);
    return data;
  } catch (error) {
    console.error("❌ getMyBookings error:", error);
    return [];
  }
};