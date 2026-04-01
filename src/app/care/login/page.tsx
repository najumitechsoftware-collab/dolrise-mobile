"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./CareLogin.css";

export default function CareLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [officerId, setOfficerId] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PASSWORD STRENGTH ================= */
  const hasMinLength = password.length >= 15;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const isStrong =
    hasMinLength && hasUpper && hasLower && hasSymbol;

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");

    if (!isStrong) {
      setError("Password does not meet security requirements.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/care/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ CRITICAL
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          officer_id: officerId.trim().toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Invalid credentials");
      }

      // ✅ Cookie-based auth → just redirect
      router.push("/care/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="care-login-page">
      <div className="care-login-card">
        {/* HEADER */}
        <header className="care-login-header">
          <h1>Care Team Access</h1>
          <p>Secure access for authorized care members only.</p>
        </header>

        {/* ERROR */}
        {error && <div className="care-error">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="care-login-form">
          {/* EMAIL */}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="work@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="•••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="password-rules">
              <span className={hasMinLength ? "ok" : ""}>
                • At least 15 characters
              </span>
              <span className={hasUpper ? "ok" : ""}>
                • One uppercase letter
              </span>
              <span className={hasLower ? "ok" : ""}>
                • One lowercase letter
              </span>
              <span className={hasSymbol ? "ok" : ""}>
                • One symbol
              </span>
            </div>
          </div>

          {/* OFFICER ID */}
          <div className="field">
            <label>Officer ID</label>
            <input
              type="text"
              placeholder="DR-CARE-XXXX"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !isStrong}
          >
            {loading ? "Verifying…" : "Continue Securely"}
          </button>
        </form>

        {/* FOOTER */}
        <footer className="care-login-footer">
          <p>
            This system is monitored. Unauthorized access is prohibited.
          </p>
        </footer>
      </div>
    </main>
  );
}
