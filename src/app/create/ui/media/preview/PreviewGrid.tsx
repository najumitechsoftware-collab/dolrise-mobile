"use client";

import { useEffect, useState } from "react";
import VideoTrimmer from "../../VideoTrimmer";
import styles from "./PreviewGrid.module.css";

interface Props {
  files: File[];
  remove: (index: number) => void;
}

export default function PreviewGrid({ files, remove }: Props) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!files || files.length === 0) return;

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setUrls(newUrls);

    // cleanup (important)
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className={styles.grid}>
      {files.map((file, i) => {
        const url = urls[i];

        return (
          <div key={i} className={styles.item}>
            {file.type.startsWith("video") ? (
              <VideoTrimmer file={file} onChange={() => {}} />
            ) : (
              url && <img src={url} className={styles.image} />
            )}

            <button
              className={styles.remove}
              onClick={() => remove(i)}
            >
              ✖
            </button>
          </div>
        );
      })}
    </div>
  );
}
