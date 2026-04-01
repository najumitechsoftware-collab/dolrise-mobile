
interface Props {
  mood: string;
  text: string;
}

export default function TextShortPreview({ mood, text }: Props) {
  const moodColors: any = {
    happy: "#FFF2C4",
    sad: "#DDE4FF",
    angry: "#FFD6D2",
    cool: "#CFFFF2",
    calm: "#E9FCD8",
    deep: "#E8E4FF",
    love: "#FFE0EF",
    blessed: "#FFF9C7",
  };

  const bg = moodColors[mood?.toLowerCase()] || "#F5F5F5";

  return (
    <div
      className="textshort-preview"
      style={{
        background: bg,
        padding: "24px",
        borderRadius: "14px",
        minHeight: "120px",
        fontSize: "20px",
        fontWeight: 600,
        color: "#222",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        marginTop: "10px",
      }}
    >
      {text}
    </div>
  );
}
