// src/utils/api.js

export const getSessionToken = () => {
  if (typeof document === "undefined") return null;
  
  console.log("🍪 Current document.cookie:", document.cookie);
  
  // 1. Try __Secure- prefixed token first (production/HTTPS)
  const secureName = "__Secure-better-auth.session_token";
  const secureValue = `; ${document.cookie}`;
  let parts = secureValue.split(`; ${secureName}=`);
  if (parts.length === 2) {
    const tok = parts.pop().split(';').shift();
    console.log("🔑 Found secure token:", tok ? `${tok.substring(0, 10)}...` : "none");
    return tok;
  }
  
  // 2. Fallback to regular token (development/HTTP)
  const name = "better-auth.session_token";
  parts = secureValue.split(`; ${name}=`);
  if (parts.length === 2) {
    const tok = parts.pop().split(';').shift();
    console.log("🔑 Found regular token:", tok ? `${tok.substring(0, 10)}...` : "none");
    return tok;
  }
  
  // 3. Fallback: scan all cookies to find any cookie containing "session_token"
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    const trimmed = c.trim();
    if (trimmed.toLowerCase().includes("session_token")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const cookieName = trimmed.substring(0, eqIdx);
        const val = trimmed.substring(eqIdx + 1);
        console.log(`🔑 Found matched token in cookie [${cookieName}]:`, val ? `${val.substring(0, 10)}...` : "none");
        return val;
      }
    }
  }
  
  console.log("❌ No session token cookie found!");
  return null;
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getSessionToken();
  
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log(`📡 fetchWithAuth: Attaching Authorization header to [${url}]`);
  } else {
    console.warn(`⚠️ fetchWithAuth: No session token available for [${url}]. Request will be unauthenticated.`);
  }

  // Also default content-type if JSON body is passed
  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const mergedOptions = {
    ...options,
    headers,
    credentials: "include", // Keep for cross-domain cookie check if any
  };

  return fetch(url, mergedOptions);
};
