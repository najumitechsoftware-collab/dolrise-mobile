"use client";

import { useState } from "react";
import axios from "axios";
import styles from "../styles/twofa.module.css";

export default function Verify2FA({ ceoId, onSuccess }: any) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api.dolrise.com/api/ceo/auth/2fa/verify",
        { ceoId, token: code }
      );
      onSuccess();
    } catch {
      setError("Verification failed");
    }
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <h2>Two-Factor Verification</h2>

      <input
        type="text"
        placeholder="Enter 6 digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit">Verify</button>
    </form>
  );
}
