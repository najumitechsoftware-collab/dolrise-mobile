"use client";

import { useRouter } from "next/navigation";
import { registerSW, subscribeToPush } from "@/lib/push.client";

export default function DashboardPage() {
  const router = useRouter();

  async function enablePush() {
    try {
      await registerSW();
      await subscribeToPush();
      alert("✅ Push notifications enabled");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to enable push notifications");
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to{" "}
        <span className="text-[#d4af37]">DolRise</span> Feed
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Here begins your emotional connection journey.
        <br />
        Explore, reflect, and grow — at your own pace.
      </p>

      {/* 🔔 PUSH TEST BUTTON */}
      <button
        onClick={enablePush}
        className="mb-4 px-6 py-3 rounded-lg bg-black text-white font-semibold"
      >
        Enable Notifications (TEST)
      </button>

      {/* 🚪 LOGOUT / EXIT */}
      <button
        onClick={() => router.push("/auth/login")}
        className="px-6 py-3 rounded-lg bg-[#d4af37] text-white font-semibold"
      >
        Logout
      </button>
    </main>
  );
}
