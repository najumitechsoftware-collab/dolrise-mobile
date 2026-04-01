"use client";

/*
   DolRise — FRONTEND PROFILE API CLIENT
   ✅ Aligned with NEW backend contract
   Base routes:
   - GET    /api/profile/me/view
   - GET    /api/profile/u/:username
   - POST   /api/profile/update
*/

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/* =========================================================================
   🔐 GET MY PROFILE — PRIVATE (profile + dashboard + posts)
   ========================================================================= */
export async function getMyProfile() {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(
    `${API_BASE}/profile/me/view`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load profile");
  }

  // IMPORTANT:
  // returns { profile, dashboard, posts }
  return data;
}

/* =========================================================================
   🌍 GET PUBLIC PROFILE — SAFE PUBLIC VIEW
   ========================================================================= */
export async function getPublicProfile(username: string) {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(
    `${API_BASE}/profile/u/${username}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Profile not found");
  }

  return data; // { profile, stats }
}

/* =========================================================================
   ✏️ UPDATE PROFILE — FORM DATA (avatar, cover, text)
   ========================================================================= */
export async function updateProfile(formData: FormData) {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(
    `${API_BASE}/profile/update`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data; // { profile, dashboard }
}
