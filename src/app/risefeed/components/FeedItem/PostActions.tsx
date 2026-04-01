"use client";
import { memo, useCallback } from "react";
import "./PostActions.css";
import { haptic } from "@/lib/haptics";

interface PostActionsProps {
  felt: boolean;
  disabled?: boolean;
  onFeel: () => void;
  onReflect: () => void;
  onReEcho: () => void;
  onUplift: () => void;
}

function PostActions({
  felt,
  disabled = false,
  onFeel,
  onReflect,
  onReEcho,
  onUplift,
}: PostActionsProps) {

  const handleFeel = useCallback(() => {
    if (disabled) return;
    haptic("soft"); // 💫 gentle
    onFeel();
  }, [disabled, onFeel]);

  const handleReflect = useCallback(() => {
    if (disabled) return;
    haptic("light"); // 💬 subtle
    onReflect();
  }, [disabled, onReflect]);

  const handleReEcho = useCallback(() => {
    if (disabled) return;
    haptic("medium"); // 🔁 moderate
    onReEcho();
  }, [disabled, onReEcho]);

  const handleUplift = useCallback(() => {
    if (disabled) return;
    haptic("strong"); // 🔆 premium pulse
    onUplift();
  }, [disabled, onUplift]);

  return (
    <div className={`reactions-row ${disabled ? "paused" : ""}`}>
      
      {/* LEFT SIDE */}
      <div className="left-actions">

        <button
          type="button"
          className={`icon-btn feel ${felt ? "active" : ""}`}
          onClick={handleFeel}
          disabled={disabled}
          aria-pressed={felt}
        >
          <span className="icon">💫</span>
          <span className="label">Feel</span>
        </button>

        <button
          type="button"
          className="icon-btn reflect"
          onClick={handleReflect}
          disabled={disabled}
        >
          <span className="icon">💬</span>
          <span className="label">Reflect</span>
        </button>

        <button
          type="button"
          className="icon-btn reecho"
          onClick={handleReEcho}
          disabled={disabled}
        >
          <span className="icon">🔁</span>
          <span className="label">ReEcho</span>
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-actions">

        <button
          type="button"
          className="uplift-btn"
          onClick={handleUplift}
          disabled={disabled}
        >
          <span className="icon">🔆</span>
          <span className="label">Uplift</span>
        </button>

      </div>

    </div>
  );
}

export default memo(PostActions);
