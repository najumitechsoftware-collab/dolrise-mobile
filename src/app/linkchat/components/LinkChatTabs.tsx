"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { key: "chats", label: "Chats" },
  { key: "shared", label: "Shared spaces" },
  { key: "presence", label: "Presence" },
  { key: "discover", label: "Discover" },
];

export default function LinkChatTabs() {
  const router = useRouter();
  const pathname = usePathname();

  // /linkchat → chats
  const active =
    pathname?.split("/")[2] || "chats";

  return (
    <div className="linkchat-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={
            active === tab.key ? "active" : ""
          }
          onClick={() =>
            router.push(
              tab.key === "chats"
                ? "/linkchat"
                : `/linkchat/${tab.key}`,
            )
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
