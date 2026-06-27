const API =
  process.env.NEXT_PUBLIC_API_URL;

// Get Single User
export const getUserByEmail = async (email) => {
  const res = await fetch(
    `${API}/user/${email}`,
    {
      credentials: "include",
    }
  );

  return res.json();
};

// Get User Role
export const getUserRole = async (email) => {
  const res = await fetch(
    `${API}/user-role/${email}`,
    {
      credentials: "include",
    }
  );

  return res.json();
};

// Get All Users
export const getAllUsers = async () => {
  const res = await fetch(
    `${API}/users`,
    {
      credentials: "include",
    }
  );

  return res.json();
};

// ✅ Add This
export const updateUserRole = async (
  id,
  role
) => {
  const res = await fetch(
    `${API}/users/role/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        role,
      }),
    }
  );

  return res.json();
};