"use client";

import { useEffect, useState } from "react";
import MenuActions from "../Menu/MenuActions";
import SavedSheet from "../../saved/components/SavedSheet";
import { savePost, isSaved } from "../../saved/api/savedApi";

interface Props {
  isOwner: boolean;
  post: any;
  onClose: () => void;
}

export default function PostMenu({ isOwner, post, onClose }: Props) {
  const [savedOpen, setSavedOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<boolean>(false);

  /* ===============================
     🔍 CHECK SAVED STATUS
  =============================== */
  useEffect(() => {
    let mounted = true;
    isSaved(post.id)
      .then((res) => {
        if (mounted) setSaved(res.saved);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [post.id]);

  /* ===============================
     💾 SAVE HANDLER
  =============================== */
  const handleSave = async () => {
    if (saving || saved) return;
    setSaving(true);
    try {
      await savePost(post.id);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <MenuActions
        isOwner={isOwner}
        onClose={onClose}
        onEdit={
          isOwner
            ? () => {
                onClose();
                window.location.href = `/dashboard/posts/${post.id}/edit`;
              }
            : undefined
        }
        onArchive={
          isOwner
            ? () => {
                onClose();
                window.location.href = `/dashboard/posts/${post.id}/archive`;
              }
            : undefined
        }
        onDelete={
          isOwner
            ? () => {
                onClose();
                window.location.href = `/dashboard/posts/${post.id}/delete`;
              }
            : undefined
        }
        onSave={!isOwner ? handleSave : undefined}
        isSaved={saved}
        onOpenSaved={() => setSavedOpen(true)}
        onCopyLink={() => {
          navigator.clipboard.writeText(post.shareUrl);
          onClose();
        }}
        onReport={() => {
          onClose();
          window.location.href = `/dashboard/posts/${post.id}/report`;
        }}
      />

      {/* ===============================
          SAVED BOTTOM SHEET
      =============================== */}
      <SavedSheet
        isOpen={savedOpen}
        onClose={() => setSavedOpen(false)}
        activePost={post}
      />
    </>
  );
}
