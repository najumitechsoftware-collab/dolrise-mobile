/* ============================================================
   DolRise Smart Audio Engine
   Global + Persistent + Cross-Tab + Smooth Fade
============================================================ */

type SoundState = "locked" | "muted" | "enabled";

interface Subscriber {
  (state: SoundState): void;
}

class GlobalSoundEngine {
  private state: SoundState = "locked";
  private subscribers: Set<Subscriber> = new Set();
  private activeVideo: HTMLVideoElement | null = null;
  private fadeDuration = 400; // ms

  constructor() {
    this.init();
  }

  /* ===========================
     INIT
  =========================== */

  private init() {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("dolrise:sound");

    if (saved === "enabled" || saved === "muted") {
      this.state = saved;
    }

    /* 🔁 Cross Tab Sync */
    window.addEventListener("storage", (e) => {
      if (e.key === "dolrise:sound" && e.newValue) {
        this.state = e.newValue as SoundState;
        this.notify();
      }
    });

    /* 🎧 Headphone Detection (limited support) */
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.addEventListener?.(
        "devicechange",
        () => {
          // Soft detection only (no auto enable)
          console.log("Audio output device changed");
        }
      );
    }
  }

  /* ===========================
     SUBSCRIBE
  =========================== */

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.state));
  }

  /* ===========================
     STATE CONTROL
  =========================== */

  getState() {
    return this.state;
  }

  enable() {
    this.state = "enabled";
    localStorage.setItem("dolrise:sound", "enabled");
    this.notify();
  }

  mute() {
    this.state = "muted";
    localStorage.setItem("dolrise:sound", "muted");
    this.notify();
  }

  unlockFromGesture() {
    if (this.state === "locked") {
      this.enable();
    }
  }

  /* ===========================
     VIDEO CONTROL
  =========================== */

  registerVideo(video: HTMLVideoElement) {
    if (!video) return;

    // One video at a time
    if (this.activeVideo && this.activeVideo !== video) {
      this.fadeOut(this.activeVideo);
    }

    this.activeVideo = video;

    if (this.state === "enabled") {
      this.fadeIn(video);
    } else {
      video.muted = true;
    }
  }

  unregisterVideo(video: HTMLVideoElement) {
    if (this.activeVideo === video) {
      this.activeVideo = null;
    }
  }

  /* ===========================
     FADE LOGIC
  =========================== */

  private fadeIn(video: HTMLVideoElement) {
    video.muted = false;
    video.volume = 0;

    const step = 50;
    const increment = step / this.fadeDuration;

    const interval = setInterval(() => {
      if (video.volume >= 1) {
        video.volume = 1;
        clearInterval(interval);
      } else {
        video.volume = Math.min(1, video.volume + increment);
      }
    }, step);
  }

  private fadeOut(video: HTMLVideoElement) {
    const step = 50;
    const decrement = step / this.fadeDuration;

    const interval = setInterval(() => {
      if (video.volume <= 0) {
        video.volume = 0;
        video.muted = true;
        clearInterval(interval);
      } else {
        video.volume = Math.max(0, video.volume - decrement);
      }
    }, step);
  }
}

export const globalSoundEngine = new GlobalSoundEngine();
