"use client";

export async function refreshAccessToken(oldRefreshToken: string) {
  try {
    const response = await fetch("https://api.dolrise.com/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: oldRefreshToken }),
    });

    if (!response.ok) throw new Error("Failed to refresh token.");

    const data = await response.json();

    document.cookie = `token=${data.accessToken}; path=/; Secure; SameSite=Lax;`;
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
  } catch (error) {
    // ❌ KAR A REDIRECT A NAN
    throw error;
  }
}
