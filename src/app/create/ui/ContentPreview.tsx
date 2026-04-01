"use client";

import { useEffect, useState } from "react";

export default function ContentPreview({
  mediaFiles,
  remove,
}: {
  mediaFiles: File[];
  remove: (index: number) => void;
}) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!mediaFiles || mediaFiles.length === 0) {
      setUrls([]);
      return;
    }

    // ✅ create URLs once
    const newUrls: string[] = mediaFiles.map((file: File) =>
      URL.createObjectURL(file)
    );

    setUrls(newUrls);

    // ✅ cleanup (fix memory leak + TS error)
    return () => {
      newUrls.forEach((url: string) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [mediaFiles]);

  if (!mediaFiles || mediaFiles.length === 0) return null;

  return (
    <div className="cp-wrapper">
      <h3 className="cp-title">Preview</h3>

      <div className="cp-grid">
        {mediaFiles.map((file: File, i: number) => {
          const url = urls[i];

          if (!url) return null;

          return (
            <div key={i} className="cp-item">
              {file.type.startsWith("image") ? (
                <img src={url} className="cp-img" />
              ) : (
                <video
                  src={url}
                  className="cp-video"
                  controls
                />
              )}

              <button
                className="cp-remove"
                onClick={() => remove(i)}
              >
                ✖
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
