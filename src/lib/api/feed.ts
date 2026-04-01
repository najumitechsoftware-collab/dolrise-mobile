"use client";
import { rankFeed } from "@/lib/algorithm/feedRanker";

const API_BASE = "https://api.dolrise.com/api";

/* =========================================================================
   🌟 FEED API — GET ALL POSTS (BACKEND FILTERING)
   ========================================================================= */
export async function getAllFeed(tab: string = "all") {
  try {
    const res = await fetch(`${API_BASE}/feed/all?tab=${tab}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load feed.");
    }

    return data; // backend has already filtered it!
  } catch (err) {
    console.error("Feed API Error:", err);
    return [];
  }
}

/* =========================================================================
   🌟 FLOWLINK — FOLLOW / UNFOLLOW
   ========================================================================= */
export async function toggleFollow(userId: number) {
  try {
    const res = await fetch(`${API_BASE}/flowlink/toggle`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId: userId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "FlowLink failed.");

    return data;
  } catch (err) {
    console.error("FlowLink Error:", err);
    return null;
  }
}
