"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./officer.css";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const menu = [
    { label: "Dashboard", path: "/officer/dashboard" },
    { label: "Moderation", path: "/officer/moderation" },
    { label: "My Cases", path: "/officer/my-cases" },
    { label: "Knowledge", path: "/officer/knowledge" },
    { label: "Legal", path: "/officer/legal" },
    { label: "Settings", path: "/officer/settings" },
  ];

  return (
    <div className="officer-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>DolRise Officer</h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`menu-item ${
              path === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* MAIN */}
      <main className="main-content">{children}</main>
    </div>
  );
}
