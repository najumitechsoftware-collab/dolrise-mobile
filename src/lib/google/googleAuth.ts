declare global {
  interface Window {
    google: any;
  }
}

/* =========================
   LOAD GOOGLE SCRIPT
========================= */
export function loadGoogleScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.google) return resolve();

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();

    document.body.appendChild(script);
  });
}

/* =========================
   GOOGLE LOGIN (POPUP FIX)
========================= */
export async function googleLogin(): Promise<string> {
  await loadGoogleScript();

  return new Promise((resolve, reject) => {
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (response: any) => {
          if (!response?.credential) {
            return reject("No credential returned");
          }

          console.log("✅ GOOGLE ID TOKEN:", response.credential);
          resolve(response.credential);
        },
      });

      // 🔥 FORCE ACCOUNT SELECTOR POPUP
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          reject("Google popup blocked or not supported");
        }
      });

    } catch (err) {
      reject(err);
    }
  });
}
