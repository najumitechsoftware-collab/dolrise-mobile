"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import "./dashboard.css";

export default function CeoLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menu = [
    {
      section: "Core",
      items: [
        { label: "Overview", path: "/ceo" },
        { label: "Intelligence Search", path: "/ceo/search" },
      ],
    },
    {
      section: "Operations",
      items: [
        { label: "Users", path: "/ceo/users" },
        { label: "Posts", path: "/ceo/posts" },
        { label: "KYC", path: "/ceo/kyc" },
      ],
    },
    {
      section: "Team",
      items: [
        { label: "Roles", path: "/ceo/roles" },
        { label: "Officers", path: "/ceo/officers" },
      ],
    },
    {
      section: "Trust & Safety",
      items: [
        { label: "Moderation", path: "/ceo/moderation" },
        { label: "Moderation (Live)", path: "/officer/moderation" },
        { label: "Threat Radar", path: "/ceo/threat-radar" },
        { label: "Audit Logs", path: "/ceo/audit" },
      ],
    },
    {
      section: "System",
      items: [
        { label: "Metrics", path: "/ceo/metrics" },
        { label: "Controls", path: "/ceo/controls" },
        { label: "System Config", path: "/ceo/system" },
        { label: "Logs", path: "/ceo/logs" },
        { label: "Security", path: "/ceo/security" },
      ],
    },
  ];

  return (
    <div className="exec-layout">
      {/* ================= TOP BAR ================= */}
      <header className="exec-topbar">
        <div className="left-section">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h1
            className="brand-title"
            onClick={() => router.push("/ceo")}
          >
            DolRise Executive
          </h1>
        </div>

        {/* SEARCH */}
        <div className="center-section">
          <input
            type="text"
            placeholder="Search intelligence..."
            className="exec-search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                if (value.trim()) {
                  router.push(`/ceo/search?q=${value}`);
                }
              }
            }}
          />
        </div>

        {/* RIGHT */}
        <div className="right-section">
          <div className="status-indicator">
            <span className="dot green"></span>
            Stable
          </div>

          <div className="threat-indicator">
            <span className="dot yellow"></span>
            Medium Risk
          </div>

          <div className="exec-avatar">CEO</div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <aside className={`exec-sidebar ${menuOpen ? "open" : ""}`}>
        {menu.map((group) => (
          <div key={group.section} className="menu-group">
            <p className="menu-title">{group.section}</p>

            {group.items.map((item) => {
              const active =
                pathname === item.path ||
                pathname.startsWith(item.path + "/");

              return (
                <button
                  key={item.path}
                  className={`exec-menu-item ${
                    active ? "active" : ""
                  }`}
                  onClick={() => {
                    router.push(item.path);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* ================= MAIN ================= */}
      <main className="exec-content">{children}</main>
    </div>
  );
}
