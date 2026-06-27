const API = process.env.NEXT_PUBLIC_API_URL;

// Add Property
export const addProperty = async (propertyData) => {
  const res = await fetch(`${API}/properties`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  return res.json();
};

// Get All Properties
export const getAllProperties = async (page = 1, limit = 6) => {
  const res = await fetch(
    `${API}/properties?page=${page}&limit=${limit}`
  );

  return res.json();
};

// Get My Properties
export const getMyProperties = async (email) => {
  const res = await fetch(`${API}/my-properties/${email}`, {
    credentials: "include",
  });

  return res.json();
};

// Delete Property
export const deleteProperty = async (id) => {
  const res = await fetch(`${API}/properties/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};

// Get Single Property
export const getPropertyById = async (id) => {
  const res = await fetch(`${API}/property/${id}`);

  return res.json();
};

// Update Property
export const updateProperty = async (id, propertyData) => {
  const res = await fetch(`${API}/property/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  return res.json();
};

export const getAllAdminProperties = async () => {
  const res = await fetch(`${API}/all-properties`, {
    credentials: "include",   // ← এটা যোগ করো
  });
  return res.json();
};

export const updatePropertyStatus = async (
  id,
  status,
  feedback = ""
) => {
  const res = await fetch(`${API}/property-status/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      feedback,
    }),
  });

  return res.json();
};