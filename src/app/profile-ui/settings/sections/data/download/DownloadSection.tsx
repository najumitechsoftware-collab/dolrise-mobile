"use client";

import { useEffect, useState } from "react";
import "./DownloadSection.css";

interface ExportStatus {
  status: "none" | "pending" | "processing" | "completed";
  requestedAt?: string;
  completedAt?: string;
  downloadUrl?: string | null;
}

export default function DownloadSection() {
  const [status, setStatus] = useState<ExportStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================================
     FETCH EXPORT STATUS
  ========================================= */

  async function fetchStatus() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compliance/export/status`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const contentType = res.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Unexpected server response.");
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to load status.");
      }

      setStatus(result.data);
    } catch (err: any) {
      setError(err.message || "Unable to load export status.");
    } finally {
      setLoading(false);
    }
  }

  /* =========================================
     REQUEST EXPORT
  ========================================= */

  async function requestExport() {
    try {
      setRequesting(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compliance/export`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const contentType = res.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Unexpected server response.");
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Export request failed.");
      }

      await fetchStatus();
    } catch (err: any) {
      setError(err.message || "Export request failed.");
    } finally {
      setRequesting(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return <p className="dt-loading">Checking export status...</p>;
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="download-container">
      <div className="download-card">
        <h4>Download Your Data</h4>

        <p>
          You can request a structured copy of your account data.
          The export includes profile information, content history,
          wallet activity, and policy records.
        </p>

        {error && (
          <div className="dt-error">
            {error}
          </div>
        )}

        {/* ================= STATUS UI ================= */}

        {status?.status === "none" && (
          <button
            className="primary-btn"
            onClick={requestExport}
            disabled={requesting}
          >
            {requesting ? "Submitting..." : "Request Data Export"}
          </button>
        )}

        {status?.status === "pending" && (
          <div className="status-block">
            <p className="status pending">Export Request Submitted</p>
            <small>
              Requested on {formatDate(status.requestedAt)}
            </small>
          </div>
        )}

        {status?.status === "processing" && (
          <div className="status-block">
            <p className="status processing">Preparing Your File...</p>
          </div>
        )}

        {status?.status === "completed" && (
          <div className="status-block">
            <p className="status completed">Your Data is Ready</p>

            {status.downloadUrl && (
              <a
                href={status.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
              >
                Download File
              </a>
            )}

            <small>
              Completed on {formatDate(status.completedAt)}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}
