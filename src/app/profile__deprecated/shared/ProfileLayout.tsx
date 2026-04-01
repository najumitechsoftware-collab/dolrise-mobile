"use client";

import "./profile.v2.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="profile-v2-root">{children}</div>;
}
