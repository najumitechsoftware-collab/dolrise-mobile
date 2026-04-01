"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, MailOpen, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./verify.module.css";

type Status = "info" | "loading" | "success" | "error";

/* =========================
   PAGE WRAPPER (Suspense)
========================= */

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div />}>
      <VerifyEmailPageInner />
    </Suspense>
  );
}

/* =========================
   ORIGINAL PAGE CONTENT
========================= */

function VerifyEmailPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<Status>("info");

  const [message, setMessage] = useState(
    "We’ve sent a verification link to your email 🌱\n\n" +
      "Please check your inbox and follow the instructions."
  );

  const [email, setEmail] = useState("");

  const [resending, setResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    const verifyEmail = async () => {
      setStatus("loading");
      setMessage("Verifying your email… please wait ✨ ");

      try {
        const res = await fetch(
          `https://api.dolrise.com/api/auth/verify-email?token=${token}`
        );

        let data: any = null;

        try {
          data = await res.json();
        } catch {
          // backend might return empty body
        }

        /* SUCCESS CASES */

        if (
          res.ok ||
          data?.status === "already_verified" ||
          data?.message?.toLowerCase().includes("already verified")
        ) {
          setStatus("success");

          setMessage(
            "Your email is verified 🎉\n\n" +
              "Welcome to DolRise.\n\nRedirecting you to login…"
          );

          setTimeout(() => router.replace("/auth/login"), 2500);

          return;
        }

        /* FAILURE */

        setStatus("error");

        setMessage(
          data?.message ||
            "This verification link is no longer valid 🌿\n\n" +
              "You can request a new one below."
        );
      } catch {
        setStatus("error");

        setMessage(
          "Something went wrong 🌱\n\nPlease try again later."
        );
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  const resendVerification = async () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setResending(true);

      const res = await fetch(
        "https://api.dolrise.com/api/auth/resend-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error();

      setStatus("info");

      setMessage(
        "A new verification link has been sent 🌱\n\nPlease check your inbox."
      );
    } catch {
      setStatus("error");

      setMessage("Unable to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.card}
      >
        <div className={styles.goldBar} />

        {status === "info" && <MailOpen className={styles.iconInfo} />}
        {status === "loading" && <Loader2 className={styles.iconSpin} />}
        {status === "success" && (
          <CheckCircle className={styles.iconSuccess} />
        )}
        {status === "error" && <XCircle className={styles.iconError} />}

        <h1 className={styles.title}>
          {status === "info" && "Verify Your Email"}
          {status === "loading" && "Verifying Email…"}
          {status === "success" && "Email Verified 🎉"}
          {status === "error" && "Verification Failed"}
        </h1>

        <p className={styles.message} style={{ whiteSpace: "pre-line" }}>
          {message}
        </p>

        {status === "error" && (
          <>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className={styles.resendBtn}
              onClick={resendVerification}
              disabled={resending}
            >
              {resending ? "Sending…" : "Resend Verification Email"}
            </button>
          </>
        )}

        {(status === "info" || status === "error") && (
          <Link href="/auth/login" className={styles.loginLink}>
            Back to Login
          </Link>
        )}

        <footer className={styles.footer}>
          © {new Date().getFullYear()} <span>DolRise</span>
        </footer>
      </motion.div>
    </div>
  );
}
