"use client";
import { useState, useEffect } from "react";
import { useCreateStore } from "@/store/createStore";
import { useRouter } from "next/navigation";
import AudioRecorder from "./ui/AudioRecorder";
import BackgroundSelector from "./ui/BackgroundSelector";
import MoodModal from "./ui/MoodModal";
import ReviewPanel from "./ui/ReviewPanel";
import TypeModal, { CreateType } from "./ui/TypeModal";
import PublishButton from "./ui/PublishButton";
import MediaUploader from "./ui/MediaUploader";
import DescriptionBox from "./ui/DescriptionBox";
import LocationInput from "./ui/LocationInput";
import "./ui/create.css";

export default function CreatePage() {
  const router = useRouter();
  const store = useCreateStore();

  const {
    mood,
    type,
    text,
    description,
    location,
    visibility,
    reflect,
    reecho,
    mediaFiles,
    audioFile,
    setMood,
    setType,
    setText,
    setDescription,
    setLocation,
    setVisibility,
    setReflect,
    setReecho,
    setAudio,
    clearAll,
  } = store;

  const [openMood, setOpenMood] = useState(false);
  const [openType, setOpenType] = useState(false);

  /* ================= FIX TYPE RESET ================= */
  useEffect(() => {
    if (type === "textlong") {
      setType("" as any);
    }
  }, []);

  /* ================= 🔥 STABLE PREVIEW ================= */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lockedFile, setLockedFile] = useState<File | null>(null);

  useEffect(() => {
    if (mediaFiles.length > 0) {
      const file = mediaFiles[0];

      setLockedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, [mediaFiles]);

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  const isVideo =
    lockedFile?.type?.startsWith("video") || false;

  return (
    <div className="create-wrapper">
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <button
          onClick={() => router.push("/risefeed")}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            padding: 4,
          }}
        >
          ←
        </button>
        <div>
          <h2 className="create-title" style={{ margin: 0 }}>Create</h2>
          <p className="create-sub" style={{ margin: 0 }}>
            Express your moment, your voice, your story 💛
          </p>
        </div>
      </div>

      {/* SELECTORS */}
      <div className="selector-row">
        <button className="selector-btn" onClick={() => setOpenMood(true)}>
          {mood || "Select mood"}
        </button>

        <button
          className="selector-btn"
          onClick={() => {
            if (type === "textlong") {
              router.push("/create/story");
            } else {
              setOpenType(true);
            }
          }}
        >
          {type
            ? `Format: ${
                type === "textshort"
                  ? "Quick thought"
                  : type === "photo"
                  ? "Photo"
                  : type === "video"
                  ? "Video"
                  : type === "voicemoment"
                  ? "Voice moment"
                  : "Story"
              }`
            : "Select format"}
        </button>
      </div>

      {/* MODALS */}
      {openMood && (
        <MoodModal setMood={setMood} onClose={() => setOpenMood(false)} />
      )}

      {openType && (
        <TypeModal
          setType={(t: CreateType) => {
            setType(t);
            if (t === "textlong") {
              router.push("/create/story");
            }
          }}
          onClose={() => setOpenType(false)}
        />
      )}

      {/* TEXT */}
      {type === "textshort" && (
        <>
          <BackgroundSelector />
          <textarea
            className="input-box"
            placeholder="Share a quick thought…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </>
      )}

      {/* PHOTO / VIDEO */}
      {(type === "photo" || type === "video") && (
        <div>
          {!lockedFile ? (
            <MediaUploader
              mediaFiles={mediaFiles}
              addMedia={store.addMedia}
              removeMedia={store.removeMedia}
            />
          ) : (
            <div>
              {/* PREVIEW */}
              {isVideo ? (
                <video
                  src={previewUrl || ""}
                  controls
                  playsInline
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    marginBottom: 12,
                  }}
                />
              ) : (
                <img
                  src={previewUrl || ""}
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    marginBottom: 12,
                  }}
                />
              )}

              {/* FORM */}
                 <DescriptionBox
                value={description}
              onChange={setDescription}
               />

             <LocationInput
              value={location}
             onChange={setLocation}
             />
            </div>
          )}
        </div>
      )}

      {/* VOICE */}
      {type === "voicemoment" && (
        <>
          <AudioRecorder audioFile={audioFile} setAudioFile={setAudio} />
          <textarea
            className="input-box"
            placeholder="Add a caption…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}

      {/* SETTINGS */}
      <div className="settings-box">
        <div className="setting-line">
          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "Public" | "Private")
            }
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="setting-line">
          <label>Reflect</label>
          <select
            value={reflect}
            onChange={(e) =>
              setReflect(e.target.value as "on" | "off")
            }
          >
            <option value="on">Everyone</option>
            <option value="off">Nobody</option>
          </select>
        </div>

        <div className="setting-line">
          <label>ReEcho</label>
          <select
            value={reecho}
            onChange={(e) =>
              setReecho(e.target.value as "on" | "off")
            }
          >
            <option value="on">Enabled</option>
            <option value="off">Disabled</option>
          </select>
        </div>
      </div>

      {/* REVIEW */}
      <ReviewPanel />

      {/* PUBLISH */}
      {type && type !== "textlong" && (
        <PublishButton state={store} clearAll={clearAll} />
      )}
    </div>
  );
}
