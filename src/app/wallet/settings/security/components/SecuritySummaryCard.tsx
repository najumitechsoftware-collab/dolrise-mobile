"use client";

interface Props {
  settings: any;
}

export default function SecuritySummaryCard({
  settings,
}: Props) {
  const getLevel = () => {
    if (!settings?.transaction_pin_hash)
      return "Low";

    if (settings?.access_mode === "password")
      return "Strong";

    if (settings?.access_mode === "pin")
      return "Medium";

    return "Low";
  };

  return (
    <div className="security-card summary-card">

      <h2>Security Overview</h2>

      <div className="summary-grid">

        <div>
          <span>Security Level</span>
          <strong>{getLevel()}</strong>
        </div>

        <div>
          <span>Access Mode</span>
          <strong>
            {settings?.access_mode || "none"}
          </strong>
        </div>

        <div>
          <span>Transaction PIN</span>
          <strong>
            {settings?.transaction_pin_hash
              ? "Enabled"
              : "Not Set"}
          </strong>
        </div>

        <div>
          <span>Session Timeout</span>
          <strong>
            {settings?.session_timeout || 15} min
          </strong>
        </div>

      </div>
    </div>
  );
}
