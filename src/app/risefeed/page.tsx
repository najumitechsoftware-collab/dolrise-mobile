"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import "@/styles/feed.css";

import FeedBottomNav from "@/app/risefeed/components/FeedBottomNav";
import FeedList from "@/app/risefeed/components/FeedList";
import FeedTabs from "@/app/risefeed/components/FeedTabs";
import FeedTopBar from "@/app/risefeed/components/FeedTopBar";

/* 🆕 FEED HEALTH */
import { useFeedHealth } from "./hooks/useFeedHealth";
import FeedStatusFooter from "./components/FeedStatusFooter";

/* ======================
   PAGE
====================== */
export default function RiseFeedPage() {
  const [activeTab, setActiveTab] = useState<string>("flow");
  const searchParams = useSearchParams();
  const { status } = useFeedHealth();

  /* ======================
     RESTORE TAB CONTEXT
  ====================== */
  useEffect(() => {
    let resolvedTab: string | null = null;

    const fromUrl = searchParams.get("tab");
    if (fromUrl) {
      resolvedTab = fromUrl;
    } else {
      try {
        const saved = localStorage.getItem("activeFeedTab");
        if (saved) resolvedTab = saved;
      } catch {}
    }

    if (resolvedTab && resolvedTab !== activeTab) {
      setActiveTab(resolvedTab);
    }
  }, [searchParams]);

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="feed-root">
      <FeedTopBar />

      <FeedTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* MAIN FEED */}
      <main className="feed-main">
        <FeedList activeTab={activeTab} />
      </main>

      <FeedStatusFooter status={status} />

      <FeedBottomNav />
    </div>
  );
}
