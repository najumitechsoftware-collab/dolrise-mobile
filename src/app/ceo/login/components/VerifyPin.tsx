"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ceoAxios from "@/lib/ceoAxios"; // ✅ use same axios
import styles from "../styles/pin.module.css";

export default function VerifyPin({ ceoId }: any) {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();

    if (!pin || pin.length < 4) {
      return setError("Enter valid PIN");
    }

    try {
      setLoading(true);
      setError("");

      const res = await ceoAxios.post("/api/ceo/auth/verify-pin", {
        ceoId,
        pin,
      });

      // 🔥 HANDLE TOKEN STRUCTURE SAFELY
      const token =
        res.data?.token || res.data?.data?.token || res.data?.accessToken;

      if (!token) {
        throw new Error("Token not received");
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("ceo_token", token);

      console.log("✅ CEO TOKEN SAVED");

      // 🔥 small delay for stability
      setTimeout(() => {
        router.push("/ceo");
      }, 300);

    } catch (err: any) {
      console.error("PIN VERIFY ERROR:", err?.response?.data || err);

      setError(
        err?.response?.data?.error ||
        "Verification failed. Check PIN and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <h2>🔐 Executive PIN Verification</h2>

      <input
        type="password"
        placeholder="Enter Secure PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Access Dashboard"}
      </button>
    </form>
  );
}
