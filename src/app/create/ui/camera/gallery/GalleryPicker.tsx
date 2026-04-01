"use client";

import { useRef } from "react";
import styles from "./styles/GalleryPicker.module.css";

export default function GalleryPicker({ onSelect }: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    /* =========================
       🔥 SAVE PREVIEW (CRITICAL)
    ========================= */
    const reader = new FileReader();

    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;

      try {
        sessionStorage.setItem("create-media-data", base64);
        sessionStorage.setItem(
          "create-media-type",
          file.type.startsWith("video") ? "video" : "photo"
        );
      } catch (err) {
        console.error("Preview storage failed:", err);
      }
    };

    reader.readAsDataURL(file);

    /* =========================
       NORMAL FLOW
    ========================= */
    onSelect(file);

    // 🔁 Reset input (important to avoid stale state)
    e.target.value = "";
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="file"
        accept="video/*,image/*"
        ref={inputRef}
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <button
        className={styles.button}
        onClick={openPicker}
      >
        Select from Gallery
      </button>
    </div>
  );
}
