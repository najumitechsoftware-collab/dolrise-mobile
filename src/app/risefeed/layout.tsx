import InstallPrompt from "@/components/pwa/InstallPrompt";
import IOSInstallHint from "@/components/pwa/IOSInstallHint";

export default function RisefeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* 📲 Android / Chromium */}
      <InstallPrompt />

      {/* 🍎 iOS Safari */}
      <IOSInstallHint />
    </>
  );
}
