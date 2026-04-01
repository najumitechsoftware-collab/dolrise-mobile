"use client";
import { motion } from "framer-motion";
import styles from "./registerIntro.module.css";

type Props = {
  onContinue: () => void;
};

export default function RegisterIntro({ onContinue }: Props) {
  return (
    <div className={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.card}
      >
        {/* HERO */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Social media doesn’t have to be loud
          </h1>
          <p className={styles.heroSub}>
            A calmer space to express yourself
          </p>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.title}>
            Welcome to DolRise
          </h2>

          <p className={styles.text}>
            Share your thoughts, express your emotions,
            and connect with people in a more genuine way.
          </p>

          <p className={styles.text}>
            No pressure. No noise. Just real human connection.
          </p>

          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "#888",
            }}
          >
            Free to join. No deposit required.
          </p>

          <p className={styles.shift}>
            Be heard.
            <br />
            Be understood.
            <br />
            Be yourself.
          </p>
        </div>

        {/* ACTION */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onContinue} // 🔥 NOW GOES TO CHOICE
          className={styles.cta}
        >
          Get Started — It’s Free
        </motion.button>

        {/* FOOTER */}
        <div className={styles.footer}>
          DolRise — A calm social experience
        </div>
      </motion.div>
    </div>
  );
}
