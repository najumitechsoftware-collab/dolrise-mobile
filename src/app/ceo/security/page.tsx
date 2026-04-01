"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./security.css";

export default function SecurityDashboard() {
  const router = useRouter();

  const API = "https://api.dolrise.com/api/ceo/security";

  const [summary, setSummary] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [blocked, setBlocked] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ipToBlock, setIpToBlock] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getHeaders = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("ceo_token")
        : null;

    if (!token) {
      router.push("/ceo/login");
      return null;
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const loadAll = async () => {
    try {
      setLoading(true);
      setError("");

      const headers = getHeaders();
      if (!headers) return;

      const [summaryRes, logsRes, blockedRes] = await Promise.all([
        axios.get(`${API}/summary`, { headers }),
        axios.get(`${API}/logs?page=${page}`, { headers }),
        axios.get(`${API}/blocked`, { headers }),
      ]);

      setSummary(summaryRes.data);
      setLogs(logsRes.data.logs || []);
      setTotalPages(logsRes.data.totalPages || 1);
      setBlocked(blockedRes.data || []);
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("ceo_token");
        router.push("/ceo/login");
      } else {
        setError("Failed to load security data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async () => {
    if (!ipToBlock) return alert("Enter IP address");

    try {
      const headers = getHeaders();
      if (!headers) return;

      await axios.post(
        `${API}/block-ip`,
        { ip: ipToBlock, reason },
        { headers }
      );

      setIpToBlock("");
      setReason("");
      loadAll();
    } catch (err) {
      alert("Error blocking IP");
    }
  };

  useEffect(() => {
    loadAll();
  }, [page]);

  if (loading) {
    return (
      <div className="security-wrapper">
        <h1 className="sec-title">🛡️ Security Center</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="security-wrapper">
        <h1 className="sec-title">🛡️ Security Center</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="security-wrapper">
      <h1 className="sec-title">🛡️ Security Center</h1>

      {summary && (
        <div className="sec-cards">
          <div className="sec-card">
            <p>Total Logs</p>
            <h2>{summary.totalLogs}</h2>
          </div>

          <div className="sec-card">
            <p>Last 24 Hours</p>
            <h2>{summary.last24Hours}</h2>
          </div>

          <div className="sec-card">
            <p>Top Threat IP</p>
            <h2>{summary.topIps?.[0]?.ip || "N/A"}</h2>
          </div>

          <div className="sec-card">
            <p>Most Actions</p>
            <h2>{summary.topIps?.[0]?._count?.ip || 0}</h2>
          </div>
        </div>
      )}

      <div className="block-panel">
        <h2>🚫 Block an IP</h2>

        <input
          type="text"
          placeholder="Enter IP address"
          value={ipToBlock}
          onChange={(e) => setIpToBlock(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button onClick={handleBlock}>Block IP</button>
      </div>
    </div>
  );
}
