"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Link from "next/link";

import "@/app/page.css";
import DolriseLogo from "../components/DolriseLogo";

export default function LandingPage() {

  const router = useRouter();

  useEffect(() => {

    const token = Cookies.get("session_token");

    const timer = setTimeout(() => {

      if (token) {

        router.replace("/risefeed");

      } else {

        router.replace("/auth/login");

      }

     }, 1200);

    return () => clearTimeout(timer);

  }, [router]);

  const year = new Date().getFullYear();

  return (

    <main className="landing-wrap">

      <section className="landing-center">

        <DolriseLogo />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="landing-title"
        >
          Rise With Your <span className="gold">Feelings</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="landing-text"
        >
          Not louder. Not faster.
          <br />
          Just real feelings — finally given space.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="landing-explain"
        >
          A quiet place for writers, thinkers, and mental health voices —
          where expression matters more than attention.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="landing-sub"
        >
          Feel · Reflect · Rise
        </motion.p>

      </section>

      <footer className="landing-footer">

        <p>
          © {year} DolRise · Built by Najumi Tech ·{" "}
          <Link href="/about" className="landing-link">
            About DolRise
          </Link>
        </p>

      </footer>

    </main>

  );

}
