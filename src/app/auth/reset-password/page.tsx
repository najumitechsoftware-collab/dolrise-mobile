"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./reset.module.css";

/* =========================
   PAGE WRAPPER (Suspense)
========================= */

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div />}>
      <ResetPasswordPageInner />
    </Suspense>
  );
}

/* =========================
   ORIGINAL PAGE CONTENT
========================= */

function ResetPasswordPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ===============================
     WAIT FOR HYDRATION
  =============================== */

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) {
      setToken(t);
    }
  }, [searchParams]);

  if (!token) {
    return (
      <div className={styles.page}>
        <p className={styles.invalid}>
          Invalid or expired reset link.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/auth/password/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password.");
        return;
      }

      setMessage(
        "Password reset successful. Redirecting to login…"
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.card}
      >
        <h1 className={styles.title}>
          Create New Password
        </h1>

        <p className={styles.subtitle}>
          Choose a strong password to secure your space on DolRise.
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) =>
              setConfirm(e.target.value)
            }
            required
          />

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          {message && (
            <p className={styles.success}>
              {message}
            </p>
          )}

          <button
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading
              ? "Saving…"
              : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
