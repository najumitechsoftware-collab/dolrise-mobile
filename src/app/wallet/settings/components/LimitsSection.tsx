"use client";

import { useEffect, useState } from "react";

interface LimitsData {
  daily_limit_nc: number;
  used_today_nc: number;
  remaining_nc: number;
}

export default function LimitsSection() {
  const [limits, setLimits] = useState<LimitsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadLimits() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/settings/limits",
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok || !data?.success) {
          throw new Error("FAILED");
        }

        setLimits(data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadLimits();
  }, []);

  if (loading) {
    return (
      <div className="wallet-card">
        <h2>Withdrawal Limits</h2>
        <p>Loading limits…</p>
      </div>
    );
  }

  if (error || !limits) {
    return (
      <div className="wallet-card">
        <h2>Withdrawal Limits</h2>
        <p>Unable to load limits.</p>
      </div>
    );
  }

  return (
    <div className="wallet-card">
      <h2>Withdrawal Limits</h2>

      <div className="limit-grid">
        <div>
          <span>Daily Limit</span>
          <strong>{limits.daily_limit_nc} NC</strong>
        </div>

        <div>
          <span>Used Today</span>
          <strong>{limits.used_today_nc} NC</strong>
        </div>

        <div>
          <span>Remaining</span>
          <strong>{limits.remaining_nc} NC</strong>
        </div>
      </div>

      <div className="limit-progress">
        <div
          className="limit-bar"
          style={{
            width: `${
              (limits.used_today_nc /
                limits.daily_limit_nc) *
              100
            }%`,
          }}
        />
      </div>

      <p className="soft-note">
        Withdrawal limits reset daily at 00:00 UTC.
        DolRise does not withhold or remit taxes.
        You are responsible for complying with tax
        laws in your jurisdiction.
      </p>
    </div>
  );
}
