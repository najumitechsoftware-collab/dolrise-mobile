"use client";

import { useEffect, useState } from "react";
import "./CareTeamSection.css";

interface CareTeamSectionProps {
  onBack: () => void;
}

export default function CareTeamSection({ onBack }: CareTeamSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<null | { ticket_ref: string }>(null);
  const [error, setError] = useState<string | null>(null);

  /* =====================================
     AUTO-FILL USER IDENTITY (IF LOGGED IN)
  ===================================== */
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setName(data.user.username || data.user.full_name || "");
          setEmail(data.user.email || "");
        }
      })
      .catch(() => {});
  }, []);

  /* =====================================
     SUBMIT → CARE SYSTEM (SINGLE SOURCE)
  ===================================== */
  const handleSubmit = async () => {
    setError(null);

    if (!name || !email || !subject || !message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/care/tickets", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          source: "user_support_center",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to send message");
      }

      setSuccess({ ticket_ref: data.ticket.ticket_ref });

      // clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="care-sheet">
      {/* HEADER */}
      <header className="care-header">
        <button onClick={onBack}>← Back</button>
        <h2>Care Team</h2>
        <p>Talk to a real human who cares.</p>
      </header>

      <div className="care-body">
        {/* SUCCESS */}
        {success && (
          <div className="care-success">
            <h3>Your message is now with our Care Team</h3>
            <p>
              A real Care Officer has been notified and will review your message
              with care.
            </p>

            <div className="ticket-ref">
              Reference ID: <strong>{success.ticket_ref}</strong>
            </div>

            <p className="care-note">
              Please keep this ID for reference. Typical response time is{" "}
              <strong>within 48 working hours</strong>.
            </p>

            <button className="care-submit" onClick={onBack}>
              Go back
            </button>
          </div>
        )}

        {/* FORM */}
        {!success && (
          <>
            <div className="care-intro">
              <p>
                This is a safe space. Your message will be read by a real person —
                not an automated system.
              </p>
            </div>

            <div className="care-form">
              <label>
                Your name or username
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 50))}
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, 50))}
                />
              </label>

              <label>
                What is this about?
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value.slice(0, 80))}
                />
              </label>

              <label>
                Tell us what’s going on
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 485))}
                />
                <span className="char-count">{message.length}/485</span>
              </label>

              {error && <div className="care-error">{error}</div>}

              <button
                className="care-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send to Care Team"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
