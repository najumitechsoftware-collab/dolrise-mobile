interface Props {
  active: string;
  onChange: (v: string) => void;
}

const tabs = [
  { key: "all", label: "All" },
  { key: "flow", label: "Flow" },
  { key: "post_engagement", label: "Post" },
  { key: "system", label: "System" },
];

export default function NotificationsTabs({ active, onChange }: Props) {
  return (
    <div className="notification-tabs">
      {tabs.map(t => (
        <button
          key={t.key}
          className={active === t.key ? "active" : ""}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
