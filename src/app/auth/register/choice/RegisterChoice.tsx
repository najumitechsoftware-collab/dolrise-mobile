"use client";
import { useState } from "react";
import styles from "./choice.module.css";
import { googleLogin } from "@/lib/google/googleAuth";
import DolriseLogo from "@/components/DolriseLogo";

interface Props {
  onEmail?: () => void;
}

export default function RegisterChoice({ onEmail }: Props) {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

const handleGoogle = async () => {
  if (loadingGoogle) return;

  try {
    setLoadingGoogle(true);

    const credential = await googleLogin();
	
    console.log("🎯 GOOGLE TOKEN:", credential);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: credential }),
credentials: "include",
      }
    );

    // 🔥 IMPORTANT: read safely
    let data: any = {};
    try {
      data = await res.json();
    } catch {}

    console.log("📦 RESPONSE:", res.status, data);

    // 🔥 EVEN IF NOT OK → continue (cookie may already be set)
    if (!res.ok) {
      console.warn("⚠️ Backend returned error but continuing...");
    }

    // 🔥 WAIT SMALL TIME FOR COOKIE TO SET
    await new Promise((r) => setTimeout(r, 500));

    // 🔥 VERIFY SESSION FROM BACKEND
let success = false;

for (let i = 0; i < 5; i++) {
  const check = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      credentials: "include",
    }
  );

  console.log("🔍 SESSION TRY:", i + 1, check.status);

  if (check.ok) {
    success = true;
    break;
  }

  // ⏳ jira kafin sake gwadawa
  await new Promise((r) => setTimeout(r, 500));
}

if (success) {
  console.log("✅  SESSION CONFIRMED");
  window.location.href = "/risefeed";
  return;
}

// ⚠️ fallback (no error popup)
console.warn("⚠️ Session delay — redirecting anyway");
window.location.href = "/risefeed";

  } catch (err) {
    console.error("❌ Google login failed:", err);

    alert("Google login failed. Try again.");
    setLoadingGoogle(false);
  }
};

  const handleEmail = () => {
    if (loadingEmail) return;
    setLoadingEmail(true);

    if (onEmail) {
      onEmail();
    } else {
      window.location.href = "/auth/register/email";
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <DolriseLogo />
        </div>
        <h1>Join DolRise</h1>
        <p>
          Begin your space of clarity — where your voice matters and your
          emotions are safe.
        </p>
      </div>

      <div className={styles.card}>
        <button
          className={`${styles.googleBtn} ${
            loadingGoogle ? styles.disabled : ""
          }`}
          onClick={handleGoogle}
          disabled={loadingGoogle}
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

        <button
          className={`${styles.emailBtn} ${
            loadingEmail ? styles.disabled : ""
          }`}
          onClick={handleEmail}
          disabled={loadingEmail}
        >
          {loadingEmail ? "Please wait..." : "Continue with Email"}
        </button>
      </div>

      <div className={styles.footer}>
        © {new Date().getFullYear()} DolRise · Built by Najumi Tech · All rights reserved
      </div>
    </div>
  );
}
