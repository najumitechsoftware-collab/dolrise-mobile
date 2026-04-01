"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./settings.module.css";

const API = "https://api.dolrise.com/api/ceo";

export default function ExecutiveSettings() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [twoFaCode, setTwoFaCode] = useState("");

  const [newPin, setNewPin] = useState("");

  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("ceo_token")
      : "";

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  /* ===============================
     LOAD STATUS
  =============================== */

  const loadStatus = async () => {
    try {
      const res = await axios.get(`${API}/status`, { headers });
      setStatus(res.data);
    } catch (err) {
      console.error("STATUS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  /* ===============================
     🔐 2FA SETUP
  =============================== */

  const handleGenerate2FA = async () => {
    try {
      const res = await axios.post(
        `${API}/2fa/setup`,
        {},
        { headers }
      );

      setQr(res.data.qr);
      setSecret(res.data.base32);
    } catch (err) {
      alert("2FA setup failed");
    }
  };

  const handleEnable2FA = async () => {
    try {
      await axios.post(
        `${API}/2fa/enable`,
        { token: twoFaCode },
        { headers }
      );

      alert("2FA Enabled Successfully");
      setQr(null);
      setTwoFaCode("");
      loadStatus();
    } catch (err) {
      alert("Invalid 2FA Code");
    }
  };

  /* ===============================
     🔐 PIN SET
  =============================== */

  const handleSetPin = async () => {
    if (newPin.length < 6) {
      return alert("PIN must be at least 6 digits");
    }

    try {
      await axios.post(
        `${API}/set-pin`,
        { pin: newPin },
        { headers }
      );

      alert("PIN Updated Successfully");
      setNewPin("");
      loadStatus();
    } catch (err) {
      alert("PIN update failed");
    }
  };

  /* ===============================
     🔐 SECURITY QUESTIONS
  =============================== */

  const handleSetQuestions = async () => {
    try {
      await axios.post(
        `${API}/security-questions/setup`,
        { questions },
        { headers }
      );

      alert("Security Questions Updated");
      loadStatus();
    } catch (err) {
      alert("Failed to update questions");
    }
  };

  /* ===============================
     🔐 CHANGE PASSWORD
  =============================== */

  const handleChangePassword = async () => {
    try {
      await axios.post(
        `${API}/change-password`,
        passwords,
        { headers }
      );

      alert("Password Updated");
      setPasswords({ current: "", new: "" });
    } catch (err) {
      alert("Password change failed");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!status) {
    return <div className={styles.loading}>Failed to load security data</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Executive Security Settings</h1>

      {/* ================= 2FA ================= */}
      <div className={styles.card}>
        <h2>Two-Factor Authentication</h2>

        <p>
          Status:
          <span
            className={
              status.twoFAEnabled ? styles.active : styles.inactive
            }
          >
            {status.twoFAEnabled ? " Enabled" : " Disabled"}
          </span>
        </p>

        {!status.twoFAEnabled && (
          <>
            <button onClick={handleGenerate2FA}>
              Generate QR Code
            </button>

            {qr && (
              <div className={styles.qrBox}>
                <img src={qr} alt="2FA QR" />
                <p>Secret Key: {secret}</p>

                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={twoFaCode}
                  onChange={(e) => setTwoFaCode(e.target.value)}
                />

                <button onClick={handleEnable2FA}>
                  Confirm & Enable
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= PIN ================= */}
      <div className={styles.card}>
        <h2>Executive PIN</h2>

        <p>
          Status:
          <span
            className={
              status.pinSet ? styles.active : styles.inactive
            }
          >
            {status.pinSet ? " Configured" : " Not Set"}
          </span>
        </p>

        <input
          type="password"
          placeholder="Enter new PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
        />

        <button onClick={handleSetPin}>
          {status.pinSet ? "Change PIN" : "Set PIN"}
        </button>
      </div>

      {/* ================= SECURITY QUESTIONS ================= */}
      <div className={styles.card}>
        <h2>Security Questions</h2>
        <p>Configured: {status.securityQuestionsCount}</p>

        {questions.map((q, index) => (
          <div key={index} className={styles.questionBlock}>
            <input
              placeholder="Question"
              value={q.question}
              onChange={(e) => {
                const updated = [...questions];
                updated[index].question = e.target.value;
                setQuestions(updated);
              }}
            />
            <input
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => {
                const updated = [...questions];
                updated[index].answer = e.target.value;
                setQuestions(updated);
              }}
            />
          </div>
        ))}

        <button onClick={handleSetQuestions}>
          Update Questions
        </button>
      </div>

      {/* ================= PASSWORD ================= */}
      <div className={styles.card}>
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwords.new}
          onChange={(e) =>
            setPasswords({ ...passwords, new: e.target.value })
          }
        />

        <button onClick={handleChangePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}
