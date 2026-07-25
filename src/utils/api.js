// src/utils/api.js — session helpers for authenticated API calls

export const getSessionToken = () => {
  if (typeof document === "undefined") return null;

  // 1. Prefer __Secure- cookie (production HTTPS)
  const secureName = "__Secure-better-auth.session_token";
  const secureValue = `; ${document.cookie}`;
  let parts = secureValue.split(`; ${secureName}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  // 2. Development HTTP cookie
  const name = "better-auth.session_token";
  parts = secureValue.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  // 3. Fallback: any cookie containing session_token
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const trimmed = c.trim();
    if (trimmed.toLowerCase().includes("session_token")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        return trimmed.substring(eqIdx + 1);
      }
    }
  }

  return null;
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getSessionToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
};
