"use client";

import { useState } from "react";
import axios from "axios";
import styles from "../styles/pin.module.css";

export default function SetPin({ ceoId, onSuccess }: any) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api.dolrise.com/api/ceo/auth/set-pin",
        { ceoId, pin }
      );
      onSuccess();
    } catch {
      setError("Unable to set PIN");
    }
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <h2>Set Executive PIN</h2>

      <input
        type="password"
        placeholder="10 digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit">Save PIN</button>
    </form>
  );
}
