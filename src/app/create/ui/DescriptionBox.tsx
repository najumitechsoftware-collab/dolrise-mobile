"use client";
import { useRef, useState, memo } from "react";
import "./DescriptionBox.css";

function DescriptionBox({ value, onChange }: any) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);
  const MAX = 1000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;

    if (val.length > MAX) {
      val = val.slice(0, MAX);
    }

    onChange(val);

    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  return (
    <div className={`db-container ${focused ? "focused" : ""}`}>
      <label className={`db-label ${value ? "active" : ""}`}>
        Caption
      </label>

      <textarea
        ref={ref}
        className="db-textarea"
        placeholder="Share your moment..."
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={2}
      />

      <div className="db-footer">
        <span
          className={`db-counter ${
            value.length > 900 ? "danger" : ""
          }`}
        >
          {value.length}/{MAX}
        </span>
      </div>
    </div>
  );
}

export default memo(DescriptionBox);
