"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, HelpCircle, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.css";
import DolriseLogo from "@/components/DolriseLogo";
import { googleLogin } from "@/lib/google/googleAuth"; // ✅ ADD

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false); // ✅ NEW
  const [showPassword, setShowPassword] = useState(false);
  const [typed, setTyped] = useState(false);
  const [error, setError] = useState("");

  const year = new Date().getFullYear();

  /* =========================
     🔐 EMAIL LOGIN
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;

    const identifier = (
      form.elements.namedItem("identifier") as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            "We couldn’t sign you in right now. Please try again."
        );
      }

      await new Promise((r) => setTimeout(r, 300));

      router.push("/risefeed");
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong while signing you in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     🔥 GOOGLE LOGIN
  ========================= */
  const handleGoogle = async () => {
    if (loadingGoogle) return;

    try {
      setLoadingGoogle(true);

      const credential = await googleLogin();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ idToken: credential }),
        }
      );

      // ⏳ wait + retry session
      let success = false;

      for (let i = 0; i < 5; i++) {
        const check = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (check.ok) {
          success = true;
          break;
        }

        await new Promise((r) => setTimeout(r, 500));
      }

      // 🚀 always redirect (no error popup)
      router.push("/risefeed");
    } catch (err) {
      console.error("Google login error:", err);
      setLoadingGoogle(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className={styles.card}
      >
        {/* LOGO */}
        <div className={styles.logoWrap}>
          <DolriseLogo />
        </div>

        {/* TITLE */}
        <h1 className={styles.title}>Rise With Your Feelings</h1>
        <p className={styles.sub}>
          Step back into your emotional space — we’re glad you’re here.
        </p>

        {/* ================= GOOGLE ================= */}
        <button
          onClick={handleGoogle}
          disabled={loadingGoogle}
          className={styles.googleBtn}
        >
          {loadingGoogle ? (
            <span className={styles.loader}></span>
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
              />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* DIVIDER */}
        <div className={styles.divider}>
          <span>OR</span>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Username or Email</label>
            <div className={styles.inputWrap}>
              <User className={styles.inputIcon} size={18} />
              <input
                name="identifier"
                placeholder="username or you@example.com"
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTopRow}>
              <label className={styles.inputLabel}>Password</label>
              <Link href="/auth/forgot-password" className={styles.forgot}>
                <HelpCircle size={12} /> Forgot?
              </Link>
            </div>

            <div className={styles.inputWrap}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                name="password"
                type={typed ? (showPassword ? "text" : "password") : "password"}
                placeholder="••••••••"
                required
                onChange={() => setTyped(true)}
                className={styles.inputField}
              />

              {typed && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showIcon}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={styles.btn}
          >
            {loading ? "Signing you in…" : "Login"}
          </motion.button>
        </form>

        {/* REGISTER */}
<p className={styles.register}>
  Join DolRise —{" "}
  <Link href="/auth/register" className={styles.registerLink}>
    Create your account
  </Link>
</p>
        {/* FOOTER */}
        <footer className={styles.footer}>
          <nav className={styles.footerLinks}>
            <Link href="/about">About DolRise</Link>
            <span>·</span>
            <Link href="/legal/privacy-policy">Privacy</Link>
            <span>·</span>
            <Link href="/legal/terms-of-use">Terms</Link>
          </nav>

          <p className={styles.copy}>
             © {year} DolRise · Built by Najumi Tech · All rights reserved
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
