"use client";
import { useRouter,useSearchParams } from "next/navigation";

import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import styles from "./reset-password.module.css"; // ✅ IMPORT CSS

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}

/* ============================================================
   DolRise — Reset Password (Inspirational Emotional Version)
============================================================ */
function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");

  /* 🌟 Password Strength Calculation */
  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  /* 🔍 Validate Token */
  useEffect(() => {
    if (!token) setTokenValid(false);
    else setTokenValid(true);
  }, [token]);

  /* 🔄 Reset Handler */
  const handleReset = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Unable to reset password.");

      setMessage(
        "A fresh start begins now. Your password has been renewed — rising again with clarity.",
      );
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Try again with calm.");
    } finally {
      setLoading(false);
    }
  };

  /* ❌ INVALID TOKEN */
  if (tokenValid === false) {
    return (
      <div className={styles.invalidWrapper}>
        <div className={styles.invalidBox}>
          <h1 className={styles.invalidTitle}>This reset link has expired.</h1>
          <p className={styles.invalidText}>
            Every journey has turns — request a fresh reset link and continue
            your path with confidence.
          </p>
        </div>
      </div>
    );
  }

  /* ✅ MAIN UI */
  return (
    <div className={styles.pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className={styles.card}
      >
        {/* Top Accent */}
        <div className={styles.topBar}></div>

        <h1 className={styles.title}>Renew Your Access</h1>
        <p className={styles.subtitle}>
          Every reset is a new beginning — step back into your protected
          emotional space with confidence.
        </p>

        {/* FORM */}
        <form onSubmit={handleReset} className={styles.form}>
          <div className={styles.inputBox}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={styles.eyeBtn}
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Strength Indicator */}
          <div className={styles.strengthRow}>
            {[1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className={`${styles.strengthBar} ${strength >= lvl ? styles.strengthActive : ""}`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Messages */}
        {message !== "" && <p className={styles.message}>{message}</p>}

        {/* Footer */}
        <footer className={styles.footer}>
          © {new Date().getFullYear()} <span>DolRise</span> — Built with purpose
          <p className={styles.quote}>
            “Every emotion deserves a safe return.”
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
