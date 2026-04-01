"use client";

import { useRouter } from "next/navigation";
import NotificationBell from "@/components/NotificationBell";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="dashboard-shell">
      {/* TOP BAR */}
      <header className="dashboard-topbar">
        <div
          className="brand"
          onClick={() => router.push("/risefeed")}
        >
          DolRise
        </div>

        <div className="topbar-actions">
          <NotificationBell
            onClick={() => router.push("/notifications")}
          />
        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
