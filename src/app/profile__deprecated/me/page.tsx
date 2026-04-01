"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.dolrise.com/api/profile/me/view", {
      credentials: "include"
    })
      .then(r => r.json())
      .then(d => router.replace(`/profile/${d.profile.username}`))
      .catch(() => router.replace("/auth/login"));
  }, []);

  return <div>Loading your profile…</div>;
}
