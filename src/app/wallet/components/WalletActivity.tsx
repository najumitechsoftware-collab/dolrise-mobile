"use client";

import "./WalletActivity.css";

interface Props {
  activities: any[];
}

function formatDate(date: string) {
  const d = new Date(date);
  const today = new Date();

  const isToday =
    d.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    d.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function formatTime(date: string) {
  const d = new Date(date);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFullDate(date: string) {
  const d = new Date(date);
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ✅ NEW: normalize amount */
function getAmount(item: any) {
  return (
    item.amount ??
    item.net_amount ??
    item.nc_amount ??
    0
  );
}

/* ✅ NEW: detect sign properly */
function isPositiveTx(item: any) {
  const type = item.type?.toLowerCase();

  if (type === "deposit") return true;
  if (type === "withdrawal") return false;
  if (type === "exchange") return false;

  // fallback: check amount sign
  const amt = getAmount(item);
  return amt > 0;
}

function getTypeIcon(type: string) {
  switch (type) {
    case "deposit":
      return "➕";
    case "withdrawal":
      return "➖";
    case "exchange":
      return "🔄";
    default:
      return "🌿";
  }
}

function getStatusClass(status: string) {
  if (status === "success") return "status-success";
  if (status === "processing") return "status-pending";
  if (status === "failed") return "status-failed";
  return "status-default";
}

export default function WalletActivity({
  activities,
}: Props) {
  const grouped: Record<string, any[]> = {};

  activities.forEach((item) => {
    const key = formatDate(
      item.created_at || new Date().toISOString()
    );

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  return (
    <div className="wallet-activity-wrapper">
      {/* HEADER */}
      <div className="activity-header">
        <h3>Activity</h3>
        <p>Your financial flow, calmly tracked.</p>
      </div>

      {/* EMPTY */}
      {activities.length === 0 && (
        <div className="wallet-empty-state">
          <div className="empty-icon">🌿</div>
          <p className="empty-title">
            Your journey begins here
          </p>
          <p className="empty-sub">
            No activity yet. When you move funds,
            it will appear here.
          </p>
        </div>
      )}

      {/* LIST */}
      {Object.entries(grouped).map(
        ([date, items]) => (
          <div key={date} className="activity-group">
            <div className="activity-date">
              {date}
            </div>

            {items.map((item, i) => {
              const createdAt =
                item.created_at ||
                new Date().toISOString();

              const amount = getAmount(item);
              const isPositive =
                isPositiveTx(item);

              const isToday =
                formatDate(createdAt) === "Today";

              return (
                <div
                  key={i}
                  className="activity-card"
                >
                  {/* LEFT */}
                  <div className="activity-left">
                    <div className="activity-icon">
                      {getTypeIcon(item.type)}
                    </div>

                    <div>
                      <div className="activity-title">
                        {item.type ||
                          "Transaction"}
                      </div>

                      <div className="activity-ref">
                        {item.reference}
                      </div>

                      {/* DATE + TIME */}
                      <div className="activity-time">
                        {isToday
                          ? formatTime(createdAt)
                          : formatFullDate(
                              createdAt
                            )}
                      </div>

                      <div className="activity-note">
                        Moving gently, growing steadily.
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="activity-right">
                    <div
                      className={`activity-amount ${
                        isPositive
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {isPositive ? "+" : "-"}
                      {Math.abs(amount)} NC
                    </div>

                    <div
                      className={`activity-status ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status ||
                        "completed"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
