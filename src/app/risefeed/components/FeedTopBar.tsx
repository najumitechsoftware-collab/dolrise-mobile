"use client";

import { useRouter } from "next/navigation";
import "./FeedTopBar.css";
import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

/* ===============================
   LUMI / EMOTIONAL MESSAGES
================================ */
const messages = [
  { text: "Ask Lumi about your emotions…", duration: 5000 },
  { text: "Search people, moments & rising stories…", duration: 4000 },
  { text: "Lumi helps you discover what you don’t know yet ✨", duration: 5000 },
];

export default function FeedTopBar() {
  const router = useRouter();

  const [hidden, setHidden] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  /* 🔔 NOTIFICATION STATE */
  const [unreadCount, setUnreadCount] = useState(0);

  /* ===============================
     FETCH NOTIFICATIONS
  =============================== */
  useEffect(() => {
    fetch("https://api.dolrise.com/api/notifications", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setUnreadCount(data.unreadCount || 0);
      })
      .catch(() => {});
  }, []);

  /* ===============================
     HIDE TOPBAR ON SCROLL
  =============================== */
  useEffect(() => {
    let lastScroll = 0;

    function onScroll() {
      const current = window.scrollY;

      if (current > lastScroll && current > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = current;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===============================
     ROTATING TEXT
  =============================== */
  useEffect(() => {
    const current = messages[msgIndex];

    const timer = setTimeout(() => {
      setFade(false);

      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, current.duration);

    return () => clearTimeout(timer);
  }, [msgIndex]);

  /* ===============================
     NAVIGATION
  =============================== */
  function openSearch() {
    router.push("/search");
  }

  function openNotifications() {
    router.push("/notifications");
    setUnreadCount(0); // reset locally
  }

  /* ===============================
     BADGE LOGIC
  =============================== */
  const displayCount =
    unreadCount > 99 ? "99+" : unreadCount > 0 ? unreadCount : "";

  return (
    <div className={`feed-topbar ${hidden ? "hide" : ""}`}>
      {/* LEFT */}
      <div className="topbar-left">
        <span className="brand">DolRise</span>
      </div>

      {/* CENTER */}
      <div
        className="topbar-center clickable"
        onClick={openSearch}
        role="button"
      >
        <Search size={22} className="search-icon" />

        <span className={`rotating-text ${fade ? "fade-in" : "fade-out"}`}>
          {messages[msgIndex].text}
        </span>
      </div>

      {/* RIGHT → NOTIFICATIONS */}
      <button
        className="topbar-right notification-btn"
        onClick={openNotifications}
      >
        <Bell size={22} />

        {/* 🔴 BADGE */}
        {unreadCount > 0 && (
          <span className="notification-badge">
            {displayCount || ""}
          </span>
        )}
      </button>
    </div>
  );
}
