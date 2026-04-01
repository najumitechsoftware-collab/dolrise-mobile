"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./forgot.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/auth/password/forgot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Unable to send reset link.");
        return;
      }

      setStatus("success");
      setMessage(
        "A secure reset link has been sent to your email.\n\n" +
          "Please check your inbox. If you don’t see it within a minute, " +
          "check your Spam or Promotions folder.\n\n" +
          "For security reasons, this link will expire shortly."
      );
    } catch (err) {
      console.error("Forgot password error:", err);
      setStatus("error");
      setMessage("Network error. Please try again shortly.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={styles.card}
      >
        <div className={styles.topBorder} />

        <h1 className={styles.title}>Reset Your Password</h1>

        <p className={styles.subtitle}>
          Losing access happens — what matters is finding your way back.
          Enter your email and we’ll send a secure doorway to restore your account.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email Address</label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "success"}
            className={styles.input}
          />

          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileTap={{ scale: 0.97 }}
            className={styles.submitBtn}
          >
            {status === "loading"
              ? "Sending…"
              : status === "success"
              ? "Email Sent ✓"
              : "Send Reset Link"}
          </motion.button>
        </form>

        {status !== "idle" && (
          <p
            className={`${styles.statusMsg} ${
              status === "success" ? styles.success : styles.error
            }`}
            style={{ whiteSpace: "pre-line" }}
          >
            {message}
          </p>
        )}

        <footer className={styles.footer}>
          © {new Date().getFullYear()} <span>DolRise</span> • Built by{" "}
          <span>Najumi Tech</span>
          <p>“By truth we rise, by trust we stand.”</p>
        </footer>
      </motion.div>
    </div>
  );
}
