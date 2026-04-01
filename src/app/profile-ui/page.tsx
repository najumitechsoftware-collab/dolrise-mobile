import ProfileClient from "./ProfileClient";
import { cookies } from "next/headers";

/* ✅ FORCE NO CACHE (VERY IMPORTANT) */
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProfileData() {
  try {
     const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      console.error("No session token found");
      return null;
    }

    const API =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:5000/api";

    const res = await fetch(
      `${API}/profile/me/view`,
      {
        method: "GET",
        headers: {
          Cookie: `session_token=${sessionToken}`,
          Accept: "application/json",
        },

        /* ✅ KASHE CACHE GABA DAYA */
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      console.error("Profile API failed:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data?.profile) {
      console.error("Invalid profile response");
      return null;
    }

    return data;

  } catch (error) {
    console.error("Profile server error:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const data = await getProfileData();

  if (!data) {
    return (
      <div style={{ padding: 40 }}>
        Unable to load profile
      </div>
    );
  }

  return (
    <ProfileClient
      initialData={data}
    />
  );
}
