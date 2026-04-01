"use client";

import { useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/credentials.module.css";

export default function Credentials({ onSuccess }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startTime = useRef<number | null>(null);
  const keyCount = useRef(0);

  // Track typing behavior
  const handleKeyDown = () => {
    if (!startTime.current) {
      startTime.current = Date.now();
    }
    keyCount.current += 1;
  };

  // Prevent paste
  const handlePaste = (e: any) => {
    e.preventDefault();
    setError("PASTE_NOT_ALLOWED");
  };

  const submit = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    const duration = startTime.current
      ? Date.now() - startTime.current
      : 0;

    try {
      const res = await axios.post(
        "https://api.dolrise.com/api/ceo/auth/login",
        {
          email,
          password,
          typingMetrics: {
            duration,
            keyCount: keyCount.current,
          },
        }
      );

      onSuccess(res.data);
    } catch (err: any) {
      console.log("LOGIN ERROR:", err.response?.data);

      const backendError = err.response?.data?.error;

      if (backendError) {
        setError(backendError);
      } else {
        setError("SERVER_ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <h2 className={styles.title}>DolRise Executive Access</h2>

      <input
        type="email"
        placeholder="Executive Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onPaste={handlePaste}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoComplete="off"
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Continue"}
      </button>
    </form>
  );
}
