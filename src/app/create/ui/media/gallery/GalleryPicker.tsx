"use client";

import { useRef } from "react";
import styles from "./GalleryPicker.module.css";

interface Props {
  onSelect: (files: File[]) => void;
}

export default function GalleryPicker({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function open() {
    inputRef.current?.click();
  }

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const list = Array.from(files);

    console.log("📸 FILE SELECTED:", list);

    // 🔥 VERY IMPORTANT
    onSelect(list);
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={open} className={styles.button}>
        Upload from Gallery
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        hidden
        onChange={handle}
      />
    </div>
  );
}
