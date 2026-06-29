// src/services/authApi.js
const API = process.env.NEXT_PUBLIC_API_URL;

// ❌ generateJWT removed - Better Auth handles authentication

// Logout user (clear Better Auth cookies)
export const logoutUser = async () => {
  try {
    const res = await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
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
    const res = await fetch(`${API}/save-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error("saveUser error:", error);
    return { success: false };
  }
};