import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

/* 🔌 PWA core */
import ServiceWorkerProvider from "@/components/pwa/ServiceWorkerProvider";
import InstallPrompt from "@/components/pwa/InstallPrompt";

/* =========================================================
   GLOBAL METADATA — PRODUCTION READY
========================================================= */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://dolrise.com"),

  title: {
    default: "DolRise",
    template: "%s | DolRise",
  },

  description:
    "DolRise is a calm emotional social space where people rise with their feelings, not noise.",

  applicationName: "DolRise",

  manifest: "/manifest.json",

  icons: {
    icon: [
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    title: "DolRise",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    title: "DolRise",
    description:
      "Rise with your feelings. A calm emotional social platform.",
    url: "https://dolrise.com",
    siteName: "DolRise",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DolRise",
    description:
      "Rise with your feelings. A calm emotional social platform.",
    images: ["/icons/icon-512.png"],
  },
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,

  /* match manifest splash */
  themeColor: "#f5f4ee",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        {/* 🔌 Service Worker */}
        <ServiceWorkerProvider />

        {/* 📲 PWA Install Prompt */}
        <InstallPrompt />

        {/* 🌐 App Root */}
        <div id="app">{children}</div>

      </body>
    </html>
  );
}
