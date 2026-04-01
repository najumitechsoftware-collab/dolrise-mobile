"use client";

import { useState, useEffect } from "react";
import Credentials from "./components/Credentials";
import Verify2FA from "./components/Verify2FA";
import SetPin from "./components/SetPin";
import VerifyPin from "./components/VerifyPin";
import SetSecurityQuestions from "./components/SetSecurityQuestions";

import useInactivityGuard from "./useInactivityGuard";
import "./styles/layout.css";
import "./axiosInterceptor";

export type Stage =
  | "credentials"
  | "setup2fa"
  | "verify2fa"
  | "setPin"
  | "setQuestions"
  | "pin";

export default function CeoAccessPage() {
  const [stage, setStage] = useState<Stage>("credentials");
  const [ceoId, setCeoId] = useState<number | null>(null);

  // 🔐 Inactivity protection
  useInactivityGuard(10 * 60 * 1000);

  /**
   * ==========================================
   * 🔐 MULTI TAB PROTECTION
   * ==========================================
   */
  useEffect(() => {
    const channel = new BroadcastChannel("ceo_session");

    channel.onmessage = (event) => {
      if (event.data === "logout") {
        localStorage.removeItem("ceo_token");
        window.location.href = "/ceo/login";
      }
    };

    return () => channel.close();
  }, []);

  /**
   * ==========================================
   * 🔐 STAGE ROUTING LOGIC (STRICT ORDER)
   * ==========================================
   */
  const handleCredentialSuccess = (data: any) => {
    setCeoId(data.ceoId);

    // 1️⃣ If 2FA not set → MUST setup first
    if (data.require2FASetup) {
      return setStage("setup2fa");
    }

    // 2️⃣ If 2FA enabled → verify before anything else
    if (data.require2FA) {
      return setStage("verify2fa");
    }

    // 3️⃣ If PIN not set → setup
    if (data.requirePinSetup) {
      return setStage("setPin");
    }

    // 4️⃣ If Security questions not set → setup
    if (data.requireSecuritySetup) {
      return setStage("setQuestions");
    }

    // 5️⃣ Final step → PIN verification
    return setStage("pin");
  };

  return (
    <div className="layout-wrapper">

      {stage === "credentials" && (
        <Credentials onSuccess={handleCredentialSuccess} />
      )}

      {/* 2FA Setup */}
      {stage === "setup2fa" && ceoId && (
        <Verify2FA
          ceoId={ceoId}
          setupMode={true}
          onSuccess={() => setStage("verify2fa")}
        />
      )}

      {/* 2FA Verify */}
      {stage === "verify2fa" && ceoId && (
        <Verify2FA
          ceoId={ceoId}
          onSuccess={() => {
            // after 2FA → check next required stage
            setStage("setPin");
          }}
        />
      )}

      {/* PIN Setup */}
      {stage === "setPin" && ceoId && (
        <SetPin
          ceoId={ceoId}
          onSuccess={() => setStage("setQuestions")}
        />
      )}

      {/* Security Questions Setup */}
      {stage === "setQuestions" && ceoId && (
        <SetSecurityQuestions
          ceoId={ceoId}
          onSuccess={() => setStage("pin")}
        />
      )}

      {/* Final PIN Verification */}
      {stage === "pin" && ceoId && (
        <VerifyPin ceoId={ceoId} />
      )}

    </div>
  );
}
