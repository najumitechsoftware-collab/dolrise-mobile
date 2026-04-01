"use client";

import { useEffect, useState } from "react";
import "./DevicesSection.css";

interface Session {
  id: number;
  device_info?: string;
  ip_address?: string;
  location?: string;
  last_used_at?: string | null;
  created_at?: string | null;
  is_active: boolean;
  user_agent?: string;
}

export default function DevicesSection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchSessions();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/security/sessions`,
        { credentials: "include" }
      );

      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutSession = async (id: number) => {
    if (!confirm("Log out this device?")) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/security/sessions/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    fetchSessions();
  };

  /* ===============================
     DEVICE NAME PARSER
  =============================== */
  const parseDevice = (ua?: string) => {
    if (!ua) return "Unknown Device";

    let browser = "Browser";
    let os = "Device";

    if (ua.includes("Chrome")) browser = "Chrome";
    if (ua.includes("Firefox")) browser = "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome"))
      browser = "Safari";

    if (ua.includes("Android")) os = "Android";
    if (ua.includes("iPhone")) os = "iPhone";
    if (ua.includes("Windows")) os = "Windows";
    if (ua.includes("Mac OS")) os = "Mac";
    if (ua.includes("Linux")) os = "Linux";

    return `${browser} on ${os}`;
  };

  /* ===============================
     SAFE DATE FORMATTER
  =============================== */
  const formatDate = (date?: string | null) => {
    if (!date) return "Unknown";

    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "Unknown";

    return parsed.toLocaleString();
  };

  /* ===============================
     LOCATION FORMAT
  =============================== */
  const formatLocation = (session: Session) => {
    if (
      session.ip_address?.includes("127.0.0.1") ||
      session.ip_address?.includes("::ffff")
    ) {
      return "Local Device";
    }

    return (
      session.location ||
      session.ip_address ||
      "Unknown location"
    );
  };

  return (
    <div className="devices-overlay slide-up">
      <div className="devices-sheet">

        <header className="devices-header">
          <button onClick={onBack}>← Back</button>
          <h2>Devices & Sessions</h2>
          <p>Manage logged-in devices</p>
        </header>

        <div className="devices-body">

          {loading && (
            <p className="loading">Loading sessions...</p>
          )}

          {!loading && sessions.length === 0 && (
            <p className="empty">
              No active sessions found.
            </p>
          )}

          {!loading &&
            sessions.map((session, index) => (
              <div
                key={session.id}
                className={`device-card ${
                  index === 0 ? "current" : ""
                }`}
              >
                <div>
                  <h3>
                    {parseDevice(session.user_agent)}
                  </h3>

                  <p>{formatLocation(session)}</p>

                  <small>
                    Last active:{" "}
                    {formatDate(
                      session.last_used_at ||
                        session.created_at
                    )}
                  </small>
                </div>

                {index === 0 ? (
                  <span className="badge">
                    Current
                  </span>
                ) : (
                  <button
                    className="logout-btn"
                    onClick={() =>
                      logoutSession(session.id)
                    }
                  >
                    Log out
                  </button>
                )}
              </div>
            ))}

        </div>

      </div>
    </div>
  );
}
