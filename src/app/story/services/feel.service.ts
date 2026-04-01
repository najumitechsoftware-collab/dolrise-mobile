export async function feelStory(storyId: number) {
  const res = await fetch(
    `https://api.dolrise.com/api/feel`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target_type: "textlong",
        target_id: storyId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to feel story");
  }

  return res.json();
}
