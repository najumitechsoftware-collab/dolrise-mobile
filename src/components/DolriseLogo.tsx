"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DolriseLogo() {
  return (
    <motion.div
      style={{
        width: "clamp(220px, 70vw, 420px)", /* 🔥 nan ne girman */
        aspectRatio: "1 / 1",
        marginBottom: 40,
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: 1,
        scale: [1, 1.04, 1],
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 1 },
        scale: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <Image
        src="/logo/dolrise-mark.png"
        alt="DolRise Logo"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
}
