import Link from "next/link";

export default function PostsSection({ posts = [], onSelect }: any) {
  if (!posts.length) return null;

  return (
    <div className="search-section">
      <h4>Posts</h4>

      {posts.map((p: any) => (
        <Link
          key={p.id}
          href={`/reflect/${p.id}`}
          onClick={onSelect}
          className="search-item"
        >
          <div className="post-snippet">{p.content.slice(0, 90)}…</div>
          <span className="meta">
            💫 {p.feels_count} · 🔁 {p.reecho_count}
          </span>
        </Link>
      ))}
    </div>
  );
}
