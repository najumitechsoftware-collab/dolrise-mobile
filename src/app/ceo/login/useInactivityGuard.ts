import { useEffect } from "react";

export default function useInactivityGuard(timeout = 10 * 60 * 1000) {
  useEffect(() => {
    let timer: any;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("ceo_token");
        window.location.href = "/ceo/login";
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [timeout]);
}
