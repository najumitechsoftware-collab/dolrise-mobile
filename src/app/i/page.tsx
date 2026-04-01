"use client";

import { Suspense } from "react";
import InviteGatewayPage from "./invite-client";

export default function Page() {
  return (
    <Suspense fallback={<p style={{ padding: 20 }}>Loading...</p>}>
      <InviteGatewayPage />
    </Suspense>
  );
}
