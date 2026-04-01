"use client";
import { useEffect, useState } from "react";

/*
=========================================================
useFeedMoodPrompt
---------------------------------------------------------
• Controls WHEN feed mood question appears
• Max 3 times per day (morning / evening / night)
• Uses localStorage
• No UI, no Lumi, no feed logic
=========================================================
*/

type TimeSlot = "morning" | "evening" | "night";

interface FeedMoodState {
  date: string; // YYYY-MM-DD
  morning?: boolean;
  evening?: boolean;
  night?: boolean;
}

const STORAGE_KEY = "dolrise_feed_mood_prompt";

/* ===============================
   🕰 TIME SLOT DETECTION
=============================== */
function getTimeSlot(): TimeSlot | null {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "evening";
  if (hour >= 18 || hour < 5) return "night";

  return null;
}

/* ===============================
   📅 TODAY KEY
=============================== */
function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/* ===============================
   🧠 READ STATE
=============================== */
function readState(): FeedMoodState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey() };

    const parsed = JSON.parse(raw) as FeedMoodState;

    // reset if new day
    if (parsed.date !== todayKey()) {
      return { date: todayKey() };
    }

    return parsed;
  } catch {
    return { date: todayKey() };
  }
}

/* ===============================
   💾 WRITE STATE
=============================== */
function writeState(state: FeedMoodState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ===============================
   🎯 MAIN HOOK
=============================== */
export function useFeedMoodPrompt() {
  const [shouldShow, setShouldShow] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<TimeSlot | null>(
    null
  );

  useEffect(() => {
    const slot = getTimeSlot();
    if (!slot) return;

    const state = readState();

    // show only if not answered/skipped in this slot
    if (!state[slot]) {
      setShouldShow(true);
      setCurrentSlot(slot);
    }
  }, []);

  /* ===============================
     😌 USER SELECTS MOOD
  =============================== */
  const onSelectMood = (mood: string) => {
    if (!currentSlot) return;

    const state = readState();
    state[currentSlot] = true;
    writeState(state);

    // NOTE:
    // mood will be sent to Lumi later (outside this hook)
    setShouldShow(false);
  };

  /* ===============================
     ⏭ USER SKIPS
  =============================== */
  const onSkip = () => {
    if (!currentSlot) return;

    const state = readState();
    state[currentSlot] = true;
    writeState(state);

    setShouldShow(false);
  };

  return {
    shouldShow,     // boolean
    onSelectMood,   // (mood: string) => void
    onSkip,         // () => void
  };
}
