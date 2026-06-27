const API = process.env.NEXT_PUBLIC_API_URL;

export const addFavorite = async (
  favoriteData
) => {
  const res = await fetch(
    `${API}/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      credentials: "include",
      body: JSON.stringify(
        favoriteData
      ),
    }
  );

  return res.json();
};

export const getFavorites =
  async () => {
    const res = await fetch(
      `${API}/favorites`,
      {
        credentials: "include",
      }
    );

    return res.json();
  };

export const removeFavorite =
  async (id) => {
    const res = await fetch(
      `${API}/favorites/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    return res.json();
  };