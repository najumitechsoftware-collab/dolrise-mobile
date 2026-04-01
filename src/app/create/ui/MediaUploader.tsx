"use client";
import { useRef, useState } from "react";
import CameraRecorder from "./media/camera/CameraRecorder";
import GalleryPicker from "./media/gallery/GalleryPicker";
import PreviewGrid from "./media/preview/PreviewGrid";
import styles from "./MediaUploader.module.css";

interface Props {
  mediaFiles: File[];
  addMedia: (files: File[]) => void;
  removeMedia: (index: number) => void;
}

export default function MediaUploader({
  mediaFiles,
  addMedia,
  removeMedia,
}: Props) {
  const modeRef = useRef<"idle" | "camera" | "gallery">("idle");
  const [, forceUpdate] = useState(0); // trigger re-render manually

  const setMode = (val: "idle" | "camera" | "gallery") => {
    modeRef.current = val;
    forceUpdate((p) => p + 1);
  };

  function handleCapture(file: File) {
    if (!file) return;
    addMedia([file]);
    setMode("idle");
  }

  function handleGallery(files: File[]) {
    if (!files || files.length === 0) return;
    addMedia(files);
    setMode("idle");
  }

  return (
    <div className={styles.uploadZone}>
      <div className={styles.actionRow}>
        <button
          className={styles.actionBtn}
          onClick={() => setMode("camera")}
        >
          📷 Camera
        </button>

        <button
          className={styles.actionBtn}
          onClick={() => setMode("gallery")}
        >
          🖼 Gallery
        </button>
      </div>

      {modeRef.current === "camera" && (
        <CameraRecorder onCapture={handleCapture} />
      )}

      {modeRef.current === "gallery" && (
        <GalleryPicker onSelect={handleGallery} />
      )}

      {mediaFiles.length > 0 && (
        <PreviewGrid files={mediaFiles} remove={removeMedia} />
      )}
    </div>
  );
}
