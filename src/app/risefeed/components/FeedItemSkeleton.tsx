
import "./FeedItemSkeleton.css";

export default function FeedItemSkeleton() {
  return (
    <div className="feed-skeleton-card">
      {/* HEADER */}
      <div className="skeleton-header">
        <div className="skeleton-avatar shimmer" />
        <div className="skeleton-header-text">
          <div className="skeleton-line short shimmer" />
          <div className="skeleton-line tiny shimmer" />
        </div>
      </div>

      {/* CAPTION */}
      <div className="skeleton-caption">
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line short shimmer" />
      </div>

      {/* MEDIA */}
      <div className="skeleton-media shimmer" />

      {/* ACTIONS */}
      <div className="skeleton-actions">
        <div className="skeleton-action shimmer" />
        <div className="skeleton-action shimmer" />
        <div className="skeleton-action shimmer" />
      </div>
    </div>
  );
}
