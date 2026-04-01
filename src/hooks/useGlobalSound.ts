"use client";

import { useEffect, useState } from "react";
import { globalSoundEngine } from "@/lib/audio/globalSoundEngine";

export function useGlobalSound() {
  const [state, setState] = useState(
    globalSoundEngine.getState()
  );

  useEffect(() => {
    const unsubscribe = globalSoundEngine.subscribe(setState);

    return () => {
      // ensure cleanup returns void (not boolean)
      unsubscribe();
    };
  }, []);

  return {
    state,
    enable: () => globalSoundEngine.enable(),
    mute: () => globalSoundEngine.mute(),
    unlock: () => globalSoundEngine.unlockFromGesture(),
  };
}
