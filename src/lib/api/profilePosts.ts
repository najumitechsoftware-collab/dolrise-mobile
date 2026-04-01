/**
 * Fetch posts created by the logged-in user (Profile only)
 */
export async function getMyProfilePosts() {
  const res = await fetch(
    "https://api.dolrise.com/api/profile/posts",
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load profile posts");
  }

  return res.json();
}
