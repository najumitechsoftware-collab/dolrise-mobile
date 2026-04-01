export default function StoryMore({ mood }: any) {
  return (
    <div style={{ marginTop: 20 }}>
      <p>Mood: {mood || "N/A"}</p>
    </div>
  );
}
