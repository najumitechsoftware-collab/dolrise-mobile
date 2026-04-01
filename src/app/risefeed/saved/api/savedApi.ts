const API = "/api/saved";

export async function savePost(postId: number, note?: string) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, note }),
  });
  if (!res.ok) throw new Error("Failed to save post");
  return res.json();
}

export async function unsavePost(postId: number) {
  const res = await fetch(`${API}/${postId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to unsave post");
  return res.json();
}

export async function isSaved(postId: number) {
  const res = await fetch(`${API}/${postId}/status`);
  if (!res.ok) throw new Error("Failed to get saved status");
  return res.json(); // { saved: boolean }
}

export async function getSavedPosts() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load saved posts");
  return res.json();
}
