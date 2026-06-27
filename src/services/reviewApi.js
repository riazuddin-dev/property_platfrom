const API = process.env.NEXT_PUBLIC_API_URL;

export const addReview = async (reviewData) => {
  const res = await fetch(`${API}/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  return res.json();
};

export const getReviews = async (propertyId) => {
  const res = await fetch(`${API}/reviews/${propertyId}`);

  return res.json();
};