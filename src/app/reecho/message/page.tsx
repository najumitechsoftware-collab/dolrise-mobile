"use client";

import { useSearchParams } from "next/navigation";
import ReEchoMessage from "@/app/risefeed/components/ReEchoMessage";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <p style={{ padding: 20 }}>Invalid message</p>;
  }

  return (
    <ReEchoMessage
      postId={id}
      onClose={() => window.history.back()}
    />
  );
}
