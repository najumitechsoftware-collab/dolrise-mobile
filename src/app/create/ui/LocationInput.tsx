"use client";
import { useState } from "react";
import "./LocationInput.css";

export default function LocationInput({ value, onChange }: any) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`loc-container ${focused ? "focused" : ""}`}>
      <span className="loc-icon">📍</span>

      <input
        type="text"
        className="loc-input"
        placeholder="Add location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
