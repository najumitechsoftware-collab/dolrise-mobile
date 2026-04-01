"use client";
import "./FeedTabs.css";
import {
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";

const tabs = [
  { key: "flow", label: "In Your Flow" },
  { key: "space", label: "Space" },
  { key: "moments", label: "Moments" },
  { key: "notes", label: "Notes" },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function FeedTabs({
  activeTab,
  onTabChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [uiTab, setUiTab] = useState(activeTab);

  useEffect(() => {
    if (activeTab !== uiTab) {
      setUiTab(activeTab);
    }
  }, [activeTab]);

  const changeTab = (key: string) => {
    if (key === uiTab) return;

    setUiTab(key);

    startTransition(() => {
      onTabChange(key);
    });

    try {
      localStorage.setItem("activeFeedTab", key);
    } catch {}
  };

  return (
    <div className="feed-tabs-wrapper" ref={ref}>
      <div className="feed-tabs">
        {tabs.map((tab) => {
          const isActive = uiTab === tab.key;

          return (
            <div
              key={tab.key}
              className={`feed-tab ${
                isActive ? "active" : ""
              }`}
              onClick={() => changeTab(tab.key)}
            >
              {tab.label}
              {isActive && (
                <div className="tab-indicator" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
