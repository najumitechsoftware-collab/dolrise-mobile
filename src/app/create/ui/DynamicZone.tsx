
import AudioRecorder from "./AudioRecorder";
import DescriptionBox from "./DescriptionBox";
import MediaUploader from "./MediaUploader";
import VisibilityPanel from "./VisibilityPanel";

interface Props {
  type: string;

  text: string;
  setText: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  mediaFiles: File[];
  addMedia: (f: File[]) => void;
  removeMedia: (i: number) => void;

  audioFile: File | null;
  setAudio: (f: File | null) => void;

  visibility: string;
  setVisibility: (v: string) => void;

  reflect: string;
  setReflect: (v: string) => void;

  reecho: string;
  setReecho: (v: string) => void;

  location: string;
  setLocation: (v: string) => void;
}

export default function DynamicZone({
  type,
  text,
  setText,

  description,
  setDescription,

  mediaFiles,
  addMedia,
  removeMedia,

  audioFile,
  setAudio,

  visibility,
  setVisibility,

  reflect,
  setReflect,

  reecho,
  setReecho,

  location,
  setLocation,
}: Props) {
  return (
    <div className="dz-wrapper">
      {/* TEXT SHORT */}
      {type === "textshort" && (
        <textarea
          className="dz-input-short"
          placeholder="Say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {/* TEXT LONG */}
      {type === "textlong" && (
        <textarea
          className="dz-input-long"
          placeholder="Write a long story..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {/* MOODCAST (PHOTO / VIDEO) */}
{type === "moodcast" && (
  <>
    {/* ❌ an cire MediaUploader */}

    <DescriptionBox value={description} onChange={setDescription} />

    <input
      className="dz-location"
      placeholder="Add location..."
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  </>
)}
      {/* VOICE MOMENT */}
      {type === "voicemoment" && (
        <>
          <AudioRecorder audioFile={audioFile} setAudioFile={setAudio} />

          <DescriptionBox value={description} onChange={setDescription} />
        </>
      )}

      {/* VISIBILITY */}
      <VisibilityPanel
        visibility={visibility}
        setVisibility={setVisibility}
        reflect={reflect}
        setReflect={setReflect}
        reecho={reecho}
        setReecho={setReecho}
      />
    </div>
  );
}
