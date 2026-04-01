"use client";

type Props = {
  query: string;
  data: any;
  onSelect: (value: string) => void;
};

export default function SearchSuggestions({ query, data, onSelect }: Props) {
  if (!query) return null;

  return (
    <div className="suggestions-box">
      {/* 🤖 LUMI */}
      {data?.lumi?.length > 0 && (
        <div className="suggest-section">
          <h4>✨ Ask Lumi</h4>
          {data.lumi.map((item: string, i: number) => (
            <div
              key={i}
              className="suggest-item lumi"
              onClick={() => onSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* 🔥 TRENDING */}
      {data?.trending?.length > 0 && (
        <div className="suggest-section">
          <h4>🔥 Trending</h4>
          {data.trending.map((item: string, i: number) => (
            <div
              key={i}
              className="suggest-item"
              onClick={() => onSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* 👤 USERS */}
      {data?.users?.length > 0 && (
        <div className="suggest-section">
          <h4>People</h4>
          {data.users.map((u: any) => (
            <div
              key={u.id}
              className="suggest-item user"
              onClick={() => onSelect(u.username)}
            >
              <img src={u.avatar_url || "/default-avatar.png"} />
              <span>@{u.username}</span>
            </div>
          ))}
        </div>
      )}

      {/* 💬 POSTS */}
      {data?.posts?.length > 0 && (
        <div className="suggest-section">
          <h4>Moments</h4>
          {data.posts.map((p: any) => (
            <div
              key={p.id}
              className="suggest-item"
              onClick={() => onSelect(p.content)}
            >
              {p.content.slice(0, 50)}...
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
