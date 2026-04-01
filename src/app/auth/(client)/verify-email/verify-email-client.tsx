"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Mail, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./verify-email.module.css";

type Status = "loading" | "success" | "error" | "expired";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState(
    "Verifying your email… please hold on ✨"
  );
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  /* =====================================================
     ✉️ VERIFY EMAIL — SAFE & CALM
  ===================================================== */
  useEffect(() => {
    const token = searchParams.get("token");
    const emailFromParams = searchParams.get("email");

    if (emailFromParams) setEmail(emailFromParams);

    if (!token) {
      setStatus("error");
      setMessage(
        "This verification link is missing or invalid.\n\nYou can request a new one anytime 🌱"
      );
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `https://api.dolrise.com/api/auth/verify-email?token=${token}`
        );

        const data = await res.json();
        const msg = (data?.message || "").toLowerCase();

        if (!res.ok) {
          // 🟢 ALREADY VERIFIED → TREAT AS SUCCESS
          if (
            msg.includes("already verified") ||
            msg.includes("already confirmed") ||
            msg.includes("verified")
          ) {
            setStatus("success");
            setMessage(
              "Your email is already verified ✅\n\nYou can safely continue to login."
            );
            setTimeout(() => router.push("/auth/login"), 2000);
            return;
          }

          if (msg.includes("expired")) {
            setStatus("expired");
            setMessage(
              "This verification link has expired.\n\nYou can request a new one below 🌿"
            );
            return;
          }

          setStatus("error");
          setMessage(
            data?.message ||
              "This verification link is no longer valid.\n\nYou can request a new one below 🌱"
          );
          return;
        }

        // ✅ VERIFIED SUCCESSFULLY
        setStatus("success");
        setMessage(
          "Your email has been successfully verified 🎉\n\nWelcome to DolRise — a calm space where emotions, trust, and growth rise together."
        );
        setTimeout(() => router.push("/auth/login"), 3000);
      } catch (err) {
        console.error("Verify email error:", err);
        setStatus("error");
        setMessage(
          "Something went wrong while verifying your email.\n\nPlease try again shortly 🌙"
        );
      }
    };

    verify();
  }, [searchParams, router]);

  /* =====================================================
     🔁 RESEND VERIFICATION EMAIL
  ===================================================== */
  const resendEmail = async () => {
    if (!email) {
      setResendMessage("Please enter your email address.");
      return;
    }

    setSending(true);
    setResendMessage("");

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/auth/resend-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      const msg = (data?.message || "").toLowerCase();

      if (!res.ok) {
        // 🟢 ALREADY VERIFIED → FRIENDLY MESSAGE
        if (
          msg.includes("already verified") ||
          msg.includes("verified")
        ) {
          setResendMessage(
            "This email is already verified ✅\nYou can log in safely."
          );
          return;
        }

        setResendMessage(
          data?.message ||
            "We couldn’t resend the verification email right now.\nPlease try again later 🌱"
        );
        return;
      }

      setResendMessage(
        "A new verification email has been sent 🌱\nPlease check your inbox (and spam folder)."
      );
    } catch (err) {
      console.error("Resend verification error:", err);
      setResendMessage("Server error. Please try again shortly.");
    } finally {
      setSending(false);
    }
  };

  /* =====================================================
     🎨 UI
  ===================================================== */
  return (
    <div className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.card}
      >
        <div className={styles.topBorder} />

        <div className={styles.iconBox}>
          {status === "loading" && (
            <Loader2 className={styles.loadingIcon} />
          )}
          {status === "success" && (
            <CheckCircle className={styles.successIcon} />
          )}
          {(status === "error" || status === "expired") && (
            <XCircle className={styles.errorIcon} />
          )}
        </div>

        <h1 className={styles.title}>
          {status === "loading" && "Verifying Email…"}
          {status === "success" && "Email Verified"}
          {status === "error" && "Verification Issue"}
          {status === "expired" && "Link Expired"}
        </h1>

        <p className={styles.message} style={{ whiteSpace: "pre-line" }}>
          {message}
        </p>

        {status === "success" && (
          <p className={styles.redirectText}>
            Redirecting you to login…
          </p>
        )}

        {(status === "error" || status === "expired") && (
          <div className={styles.resendWrap}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className={styles.resendBtn}
              disabled={sending}
              onClick={resendEmail}
            >
              {sending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Mail size={16} />
              )}
              {sending ? "Sending…" : "Resend Verification Email"}
            </button>

            {resendMessage && (
              <p
                className={styles.resendMessage}
                style={{ whiteSpace: "pre-line" }}
              >
                {resendMessage}
              </p>
            )}

            <button
              className={styles.backToLogin}
              onClick={() => router.push("/auth/login")}
            >
              Back to Login
            </button>
          </div>
        )}

        <footer className={styles.footer}>
          © {new Date().getFullYear()} <span>DolRise</span> — Built by Najumi Tech
          <p>“Rise with your feelings.”</p>
        </footer>
      </motion.div>
    </div>
  );
}
