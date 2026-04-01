"use client";

import { useEffect, useState } from "react";
import "./SummarySection.css";

interface SummaryData {
  account: {
    createdAt: string | null;
    status: string;
    emailVerified: boolean;
    lastSecurityEvent: string | null;
    activeSessions: number;
  };
  activity: {
    totalPosts: number;
    totalReflections: number;
    totalReEcho: number;
  };
  economy: {
    balanceAvailable: number;
    balanceLocked: number;
    totalLedgerEntries: number;
  };
  policy: {
    totalConsents: number;
  };
  retention: {
    messages: string;
    auditLogs: string;
    financialRecords: string;
  };
}

export default function SummarySection() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchSummary() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data-summary`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unexpected server response.");
      }

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("Failed to load summary");
      }

      // ✅ FIXED HERE
      setData(result.summary);

    } catch (err: any) {
      setError(err.message || "Unable to load your data summary.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return <p className="dt-loading">Loading your data summary...</p>;
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="dt-error">
        <p>{error}</p>
        <button onClick={fetchSummary}>Try again</button>
      </div>
    );
  }

  if (!data) return null;

  /* ================= MAIN ================= */

  return (
    <div className="summary-container">

      <Card title="Account Snapshot">
        <Row label="Account Created" value={formatDate(data.account.createdAt)} />
        <Row label="Status" value={data.account.status} />
        <Row label="Email Verified" value={data.account.emailVerified ? "Yes" : "No"} />
        <Row label="Active Sessions" value={data.account.activeSessions} />
      </Card>

      <Card title="Content & Activity">
        <Row label="Total Posts" value={data.activity.totalPosts} />
        <Row label="Reflections" value={data.activity.totalReflections} />
        <Row label="ReEcho" value={data.activity.totalReEcho} />
      </Card>

      <Card title="Economy & Wallet">
        <Row label="Available Balance (NC)" value={data.economy.balanceAvailable} />
        <Row label="Locked Balance (NC)" value={data.economy.balanceLocked} />
        <Row label="Transactions" value={data.economy.totalLedgerEntries} />
      </Card>

      <Card title="Policy Snapshot">
        <Row label="Policy Consents" value={data.policy.totalConsents} />
      </Card>

      <Card title="Data Retention">
        <Row label="Messages" value={data.retention.messages} />
        <Row label="Audit Logs" value={data.retention.auditLogs} />
        <Row label="Financial Records" value={data.retention.financialRecords} />
      </Card>

    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="summary-card">
      <h4>{title}</h4>
      <div className="summary-body">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value ?? "-"}</strong>
    </div>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}
