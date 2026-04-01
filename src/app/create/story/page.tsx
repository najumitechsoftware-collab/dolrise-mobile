"use client";

import { useRouter } from "next/navigation";
import { useCreateStore } from "@/store/createStore";
import styles from "./Story.module.css";

export default function StoryPage() {
  const router = useRouter();

  const {
    storyTitle,
    storyBody,
    setStoryTitle,
    setStoryBody,
    setText,
    setType,
  } = useCreateStore();

  const wordCount =
    storyBody.trim() === ""
      ? 0
      : storyBody.trim().split(/\s+/).length;

  const goPreview = () => {
    setText(`${storyTitle}\n\n${storyBody}`.trim());
    setType("textlong");
    router.push("/create/preview");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={() => router.push("/create")}>←</button>
        <span>Your story space</span>
      </div>

      <input
        className={styles.titleInput}
        placeholder="Story title…"
        value={storyTitle}
        onChange={(e) => setStoryTitle(e.target.value)}
      />

      <textarea
        className={styles.bodyInput}
        placeholder="Take your time… write freely."
        value={storyBody}
        onChange={(e) => setStoryBody(e.target.value)}
      />

      <div className={styles.footer}>
        <span>{wordCount} words</span>
        <button onClick={goPreview}>Continue →</button>
      </div>
    </div>
  );
}
