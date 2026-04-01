// DolRise Haptic Engine (Premium + Global Safe)

type HapticType = "soft" | "light" | "medium" | "strong";

export const haptic = (type: HapticType = "soft") => {
  if (typeof window === "undefined") return;

  const nav = window.navigator as any;

  // Support check
  if (!nav || typeof nav.vibrate !== "function") return;

  try {
    switch (type) {
      case "soft":
        nav.vibrate(8);
        break;

      case "light":
        nav.vibrate(5);
        break;

      case "medium":
        nav.vibrate(12);
        break;

      case "strong":
        nav.vibrate([10, 20, 10]);
        break;

      default:
        nav.vibrate(8);
    }
  } catch {
    // Silent fail (never break UI)
  }
};
