const API_BASE = "https://api.dolrise.com/api";

export async function getAllFeed() {
  const res = await fetch(`${API_BASE}/feed/all`, {
    credentials: "include",
  });

  return res.json();
}
