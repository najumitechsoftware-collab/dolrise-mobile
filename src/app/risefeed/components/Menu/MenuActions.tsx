import "./MenuActions.css";

export interface Props {
  isOwner: boolean;
  onClose: () => void;

  /* OWNER ACTIONS */
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;

  /* SAVED */
  onSave?: () => void | Promise<void>;
  isSaved?: boolean;
  onOpenSaved?: () => void;

  /* COMMON */
  onCopyLink: () => void;
  onReport: () => void;
}

export default function MenuActions({
  isOwner,
  onClose,

  onEdit,
  onArchive,
  onDelete,

  onSave,
  isSaved,
  onOpenSaved,

  onCopyLink,
  onReport,
}: Props) {
  return (
    <div className="menu-backdrop" onClick={onClose}>
      <div
        className="menu-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HANDLE */}
        <div className="menu-handle" />

        {/* TITLE */}
        <div className="menu-title">Post Options</div>

        {/* ================= OWNER ================= */}
        {isOwner && (
          <div className="menu-group">
            {onEdit && (
              <button className="menu-btn" onClick={onEdit}>
                ✏️ Edit Post
              </button>
            )}

            {onArchive && (
              <button className="menu-btn" onClick={onArchive}>
                🗂️ Archive Post
              </button>
            )}

            {onDelete && (
              <button className="menu-btn danger" onClick={onDelete}>
                🗑️ Delete Post
              </button>
            )}
          </div>
        )}

        {/* ================= SAVED ================= */}
        {!isOwner && (
          <div className="menu-group">
            {onSave && (
              <button
                className="menu-btn saved"
                onClick={() => {
                  if (isSaved && onOpenSaved) {
                    onOpenSaved();
                  } else {
                    onSave();
                  }
                }}
              >
                💾 {isSaved ? "Saved • View" : "Save to DolRise"}
              </button>
            )}
          </div>
        )}

        {/* ================= COMMON ================= */}
        <div className="menu-group">
          <button className="menu-btn" onClick={onCopyLink}>
            🔗 Copy Post Link
          </button>

          <button className="menu-btn danger" onClick={onReport}>
            🚨 Report Post
          </button>
        </div>

        {/* CLOSE */}
        <button className="menu-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
