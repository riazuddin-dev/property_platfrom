const API =
  process.env.NEXT_PUBLIC_API_URL;

export const generateJWT =
  async (user) => {
    const res = await fetch(
      `${API}/jwt`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials:
          "include",
        body: JSON.stringify(
          user
        ),
      }
    );

    return res.json();
  };

export const logoutUser =
  async () => {
    const res = await fetch(
      `${API}/logout`,
      {
        method: "POST",
        credentials:
          "include",
      }
    );

    return res.json();
  };