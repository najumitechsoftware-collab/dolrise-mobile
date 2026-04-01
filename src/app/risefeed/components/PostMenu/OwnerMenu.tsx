interface Props {
  post: any;
  onClose: () => void;
}

export default function OwnerMenu({ post }: Props) {
  return (
    <div className="postmenu-list">
      <button>Edit Post</button>
      <button>Adjust Visibility</button>
      <button>Pause Engagement</button>
      <button>Archive Post</button>
      <button className="danger">Delete Post</button>
      <button>Copy Link</button>
    </div>
  );
}
