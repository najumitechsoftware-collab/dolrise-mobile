"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AtSign, Eye, EyeOff, Lock, User, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import DolriseLogo from "@/components/DolriseLogo";
import RegisterIntro from "./intro/RegisterIntro";
import RegisterChoice from "./choice/RegisterChoice";

type UsernameStatus = "idle" | "checking" | "available" | "taken";

/* =========================
   MAIN PAGE (Suspense WRAP)
========================= */

export default function RegisterPage() {
  return (
    <Suspense fallback={<div />}>
      <RegisterPageInner />
    </Suspense>
  );
}

/* =========================
   ORIGINAL PAGE CONTENT
========================= */

function RegisterPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ======================
     FLOW STEP
  ====================== */
const [step, setStep] = useState("intro");

  /* ======================
     INVITE
  ====================== */

  const invitedBy = searchParams.get("invite");

  const [inviteUsername, setInviteUsername] =
    useState<string | null>(null);

  useEffect(() => {
    if (invitedBy) {
      setInviteUsername(invitedBy.toLowerCase());
    }
  }, [invitedBy]);

  /* ======================
     FORM STATE
  ====================== */

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [usernameStatus, setUsernameStatus] =
    useState<UsernameStatus>("idle");

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const year = new Date().getFullYear();

  /* ======================
     PASSWORD STRENGTH
  ====================== */

  const passwordStrength = (() => {
    if (!password) return null;

    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak" };
    if (score <= 3) return { label: "Strong" };

    return { label: "Very strong" };
  })();

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  /* ======================
     USERNAME CHECK
  ====================== */

  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      setSuggestions([]);
      return;
    }

    setUsernameStatus("checking");

    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check-username?username=${username}`
        );

        const data = await res.json();

        if (data.available) {
          setUsernameStatus("available");
          setSuggestions([]);
        } else {
          setUsernameStatus("taken");

          setSuggestions([
            `${username}_rise`,
            `${username}_flow`,
            `${username}${Math.floor(Math.random() * 100)}`,
          ]);
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 500);

    return () => clearTimeout(t);
  }, [username]);

  /* ======================
     SUBMIT
  ====================== */

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError(
        "Please enter your name as you'd like to be known here."
      );
      return;
    }

    if (!username.trim() || username.includes(" ")) {
      setError("Your username can’t include spaces.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!agree) {
      setError(
        "Before continuing, please confirm that you understand and agree to how this space is thoughtfully cared for."
      );
      return;
    }

    if (!passwordStrength || passwordStrength.label === "Weak") {
      setError("Choose a password that feels strong and safe.");
      return;
    }

    if (!passwordsMatch) {
      setError("Your passwords don’t match yet.");
      return;
    }

    if (usernameStatus === "checking") {
      setError("Checking username availability…");
      return;
    }

    if (usernameStatus !== "available") {
      setError("Please choose a username that’s available.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
         body: JSON.stringify({
  full_name: fullName.trim(),
  username: username.trim(),
  email: email.trim(),
  password,
  agree_to_terms: true,
  invited_by: inviteUsername,

  // ✅ ADD THESE
  privacyPolicyVersion: 1,
  termsVersion: 1,
}),

        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Registration failed"
        );
      }

      router.push("/auth/verify");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

/* ======================  
   RENDER  
====================== */

if (step === "intro") {
  return (
    <RegisterIntro
      onContinue={() => setStep("choice")}
    />
  );
}

if (step === "choice") {
  return (
    <RegisterChoice
      onEmail={() => setStep("form")}
    />
  );
}

if (step === "form") {
  return (
    <div className={styles.pageWrapper}>
      <motion.div className={styles.formCard}>
        <div className={styles.headerBox}>
          <Link href="/">
            <div className={styles.logoWrap}>
              <DolriseLogo />
            </div>
          </Link>

          <h1 className={styles.title}>
            Create your DolRise Account
          </h1>

          {inviteUsername && (
            <p className={styles.inviteNote}>
              🌿 <strong>@{inviteUsername}</strong> invited you into a calm space on DolRise
            </p>
          )}

          <p className={styles.subtitle}>
            Step into your emotional space — begin with clarity, trust, and care.
          </p>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          
          {/* FULL NAME */}
          <label className={styles.label}>Full Name</label>
          <div className={styles.inputWrap}>
            <User size={18} />
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* USERNAME */}
          <label className={styles.label}>Username</label>
          <div className={styles.inputWrap}>
            <AtSign size={18} />
            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value.trim().toLowerCase())
              }
              className={styles.input}
            />
          </div>

          {/* EMAIL */}
          <label className={styles.label}>Email</label>
          <div className={styles.inputWrap}>
            <Mail size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* PASSWORD */}
          <label className={styles.label}>Password</label>
          <div className={styles.inputWrap}>
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeBtn}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <label className={styles.label}>Confirm Password</label>
          <div className={styles.inputWrap}>
            <Lock size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={styles.input}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className={styles.eyeBtn}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* TERMS */}
          <div className={styles.termsRow}>
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />

            <p className={styles.termsText}>
              By continuing, you confirm that you understand and agree to enter a thoughtfully protected space — one built on respect, emotional safety, and responsible data care.
              <br />
              <span className={styles.termsLinks}>
                Learn how your data is handled in accordance with global privacy standards through our{" "}
                <Link href="/legal/terms-of-use">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy-policy">
                  Privacy Policy
                </Link>.
              </span>
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className={styles.error}>{error}</p>
          )}

          {/* SUBMIT */}
          <button
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <footer className={styles.footer}>
          © {year} DolRise · Built by Najumi Tech · All rights reserved.
        </footer>
      </motion.div>
    </div>
  );
}
}
