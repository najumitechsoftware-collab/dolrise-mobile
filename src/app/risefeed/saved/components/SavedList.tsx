import "../styles/SavedList.css";
import { useRouter } from "next/navigation";

export default function SavedList({ posts }: { posts: any[] }) {
  const router = useRouter();

  if (!posts.length) {
    return (
      <div className="saved-empty">
        Save posts to revisit them later.
      </div>
    );
  }

  return (
    <div className="saved-list">
      {posts.map((item) => (
        <div
          key={item.id}
          className="saved-card"
          onClick={() => router.push(`/post/${item.post.id}`)}
        >
          <img src={item.post.media_url} />
          <div>
            <strong>@{item.post.author.username}</strong>
            <p>{item.post.content?.slice(0, 80)}…</p>
            <span>Saved</span>
          </div>
        </div>
      ))}
    </div>
  );
}
