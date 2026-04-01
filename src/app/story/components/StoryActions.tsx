export default function StoryActions({ postId, onReflected }: any) {
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={onReflected}>
        Reflect
      </button>
    </div>
  );
}
