"use client";

import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default function Page() {
  return (
    <Suspense fallback={<p style={{ padding: 20 }}>Loading...</p>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
