"use client";

import { memo } from "react";
import styles from "../styles/CameraTopBar.module.css";

interface CameraTopBarProps {

  /* close camera */

  onClose: () => void;

  /* open emotion sound picker */

  onOpenSound: () => void;

  /* recording state */

  recording?: boolean;

}

function CameraTopBar({

  onClose,

  onOpenSound,

  recording = false

}: CameraTopBarProps) {

  /* =========================
     CLOSE CAMERA
  ========================== */

  function handleClose(e: React.MouseEvent){

    e.stopPropagation();

    onClose();

  }

  /* =========================
     OPEN SOUND PICKER
  ========================== */

  function handleSound(e: React.MouseEvent){

    e.stopPropagation();

    console.log("Emotion sound button clicked");

    onOpenSound();

  }

  return (

    <div className={styles.topBar}>

      {/* CLOSE BUTTON */}

      <button
        type="button"
        className={styles.close}
        onClick={handleClose}
        aria-label="Close camera"
      >

        ✕

      </button>


      {/* TITLE */}

      <div className={styles.title}>

        Emotion Camera

      </div>


      {/* SOUND BUTTON */}

      <button
        type="button"
        className={styles.sound}
        onClick={handleSound}
        aria-label="Open emotion sound library"
      >

        🎵 Emotion Sound

      </button>

    </div>

  );

}

export default memo(CameraTopBar);
