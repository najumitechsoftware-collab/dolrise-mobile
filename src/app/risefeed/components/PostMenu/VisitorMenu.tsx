interface Props {
  post: any;
  onClose: () => void;
}

export default function VisitorMenu({ post }: Props) {
  const hasMedia = !!post.media_url;

  const downloadMedia = () => {
    if (!hasMedia) return;
    const a = document.createElement("a");
    a.href = post.media_url;
    a.download = "dolrise-media";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="postmenu-list">
      <button>Save to DolRise</button>

      {hasMedia && (
        <button onClick={downloadMedia}>
          Download Media
        </button>
      )}

      <button>See Less Like This</button>
      <button>Take a Break From Author</button>
      <button className="danger">Report Post</button>
      <button>Copy Link</button>
    </div>
  );
}
