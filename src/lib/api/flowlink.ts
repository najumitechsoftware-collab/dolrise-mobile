"use client";

const API_BASE = "https://api.dolrise.com/api";

export async function toggleFlowLink(targetId: number) {
  try {
    const res = await fetch(`${API_BASE}/flowlink/toggle`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "FlowLink failed.");

    return data; // {following: true/false}
  } catch (err) {
    console.error("FlowLink Error:", err);
    throw err;
  }
}
