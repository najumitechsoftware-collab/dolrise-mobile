"use client";


import { useRef, useState } from "react";
import MoodStreamCard from "./MoodStreamCard";
import "./MoodStream.css";

export default function MoodStreamFeed({ posts }: any) {
  const [index, setIndex] = useState(0);
  const startY = useRef(0);
  const endY = useRef(0);

  const total = posts.length;

const next = () => {
  setIndex((i) => (i < total - 1 ? i + 1 : i));
};

const prev = () => {
  setIndex((i) => (i > 0 ? i - 1 : i));
};

  /* TOUCH */
  const onStart = (e: any) => {
    startY.current = e.touches[0].clientY;
  };

  const onMove = (e: any) => {
    endY.current = e.touches[0].clientY;
  };

  const onEnd = () => {
    const diff = startY.current - endY.current;
    if (Math.abs(diff) < 70) return;
    diff > 0 ? next() : prev();
  };

  /* DESKTOP SCROLL */
  const onWheel = (e: any) => {
    if (e.deltaY > 40) next();
    if (e.deltaY < -40) prev();
  };

  return (
    <div
      className="dolstream-container"
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      onWheel={onWheel}
    >
      {/* STREAM */}
      <div
        className="dolstream-track"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {posts.map((post: any, i: number) => (
          <div className="dolstream-slide" key={post.id || i}>
            <MoodStreamCard post={post} />
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="dolstream-indicator">
        {posts.map((_: any, i: number) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
