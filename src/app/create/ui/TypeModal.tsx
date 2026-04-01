"use client";
import { useRouter } from "next/navigation";
import { useCreateStore } from "@/store/createStore";
import styles from "./TypeModal.module.css";

export type CreateType =
  | "textshort"
  | "textlong"
  | "photo"
  | "video"
  | "voicemoment";

interface Props {
  setType: (type: CreateType) => void;
  onClose: () => void;
}

export default function TypeModal({ setType, onClose }: Props) {
  const router = useRouter();
  const store = useCreateStore();

  function openFilePicker(type: "image" | "video") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "video" ? "video/*" : "image/*";

    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 🔥 RESET OLD MEDIA FIRST (VERY IMPORTANT)
      store.setMedia([]);

      // 🔥 SET TYPE
      if (type === "video") {
        store.setType("video");
      } else {
        store.setType("photo");
      }

      // 🔥 ADD NEW FILE
      store.addMedia([file]);

      // ✅ CLOSE MODAL ONLY (NO NAVIGATION)
      onClose();
    };

    input.click();
  }

  function handleSelect(type: CreateType) {
    // 🎥 VIDEO
    if (type === "video") {
      openFilePicker("video");
      return;
    }

    // 📷 PHOTO
    if (type === "photo") {
      openFilePicker("image");
      return;
    }

    // 📖 STORY
    if (type === "textlong") {
      store.clearAll(); // reset
      onClose();
      router.push("/create/story");
      return;
    }

    // ✏️ NORMAL TYPES
    setType(type);
    onClose();
  }

  const TYPES = [
    {
      key: "textshort",
      title: "Quick Thought",
      desc: "A short emotional expression",
      emoji: "✏️",
    },
    {
      key: "textlong",
      title: "Story",
      desc: "Tell your story with depth",
      emoji: "📖",
    },
    {
      key: "photo",
      title: "Photo",
      desc: "Upload from gallery",
      emoji: "📷",
    },
    {
      key: "video",
      title: "Video",
      desc: "Upload from gallery",
      emoji: "🎥",
    },
    {
      key: "voicemoment",
      title: "Voice Moment",
      desc: "Speak from the heart",
      emoji: "🎙️",
    },
  ];

  return (
    <div className="modal">
      <div className={styles.sheet}>
        <div className={styles.header}>
          <h3>How do you want to express yourself?</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.grid}>
          {TYPES.map((t) => (
            <button
              key={t.key}
              className={styles.card}
              onClick={() => handleSelect(t.key as CreateType)}
            >
              <div className={styles.emoji}>{t.emoji}</div>
              <div className={styles.text}>
                <div className={styles.title}>{t.title}</div>
                <div className={styles.desc}>{t.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <button className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
