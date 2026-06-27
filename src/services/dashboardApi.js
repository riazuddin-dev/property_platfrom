

const API = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats = async () => {
  try {
    const res = await fetch(`${API}/dashboard-stats`, {
      credentials: "include",
    });

    console.log("STATUS =>", res.status);

    const data = await res.json();

    console.log("DATA =>", data);

    return data;
  } catch (err) {
    console.log("ERROR =>", err);
  }
};