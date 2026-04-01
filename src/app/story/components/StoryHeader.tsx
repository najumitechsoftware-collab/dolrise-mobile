export default function StoryHeader({ story }: any) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h3>@{story?.author?.username || "unknown"}</h3>
      <small>{story?.created_at || ""}</small>
    </div>
  );
}
