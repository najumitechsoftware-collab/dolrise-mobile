"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PublicProfilePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!username) return;

    const API = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API}/profile/${username}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch(() => {
        setData(null);
      });
  }, [username]);

  if (!username) {
    return <p style={{ padding: 24 }}>Invalid profile</p>;
  }

  if (!data) {
    return <p style={{ padding: 24 }}>Loading...</p>;
  }

  if (!data.profile) {
    return <p style={{ padding: 24 }}>Profile not found</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>@{data.profile.username}</h2>
      <p>{data.profile.full_name}</p>
      <p>{data.profile.bio || "No bio available"}</p>
    </div>
  );
}
