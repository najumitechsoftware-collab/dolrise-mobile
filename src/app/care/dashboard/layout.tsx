"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./CareDashboard.css";

type MenuItem = {
  label: string;
  path: string;
};

const MENU: MenuItem[] = [
  { label: "Control Center", path: "/care/dashboard" },
  { label: "Tickets", path: "/care/dashboard/tickets" },
  { label: "Global Search", path: "/care/dashboard/search" },
  { label: "Time Tracking", path: "/care/dashboard/time" },
  { label: "Team", path: "/care/dashboard/team" },
  { label: "Team Talk", path: "/care/dashboard/chat" },
  { label: "Audit Logs", path: "/care/dashboard/audit" },
  { label: "Guidelines", path: "/care/dashboard/guidelines" },
];

export default function CareDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function navigate(path: string) {
    router.push(path);
    setSidebarOpen(false);
  }

  return (
    <main className="care-dashboard">
      {/* ===== MOBILE TOP BAR ===== */}
      <header className="care-topbar">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <span className="topbar-title">Care Dashboard</span>
      </header>

      {/* ===== OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`care-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="care-logo">
          <h2>DolRise</h2>
          <span>Care Team</span>
        </div>

        <nav className="care-nav">
          {MENU.map((item) => {
            const active =
              pathname === item.path ||
              pathname.startsWith(item.path + "/");

            return (
              <button
                key={item.path}
                className={active ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <footer className="care-sidebar-footer">
          <button className="logout-btn">
            Logout
          </button>
        </footer>
      </aside>

      {/* ===== CONTENT ===== */}
      <section className="care-content">
        {children}
      </section>
    </main>
  );
}
