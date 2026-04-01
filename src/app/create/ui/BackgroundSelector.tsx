
import { useCreateStore } from "@/store/createStore";

// 🎨 Cool Background Options (solid + gradient)
const backgrounds = [
  "linear-gradient(135deg,#4A90E2,#007AFF)",
  "linear-gradient(135deg,#9B51E0,#EB54A7)",
  "linear-gradient(135deg,#FF3B30,#FF9500)",
  "linear-gradient(135deg,#4CD964,#A2F5B3)",
  "#1C1C1E",
  "linear-gradient(135deg,#FF9F0A,#FFD79C)",
  "linear-gradient(135deg,#5AC8FA,#BEEBFF)",
  "linear-gradient(135deg,#FF2D55,#FF8FA3)",
  "linear-gradient(135deg,#FF3B30,#FF9500,#FFCC00,#4CD964,#5AC8FA,#5856D6)",
  "linear-gradient(135deg,#D4AF37,#F7E27A)",
];

export default function BackgroundSelector() {
  const current = useCreateStore((s) => s.background);
  const setBackground = useCreateStore((s) => s.setBackground);

  return (
    <div style={{ marginTop: 10 }}>
      <h4 style={{ marginBottom: 6, fontWeight: 600 }}>Background Style</h4>

      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            onClick={() => setBackground(bg)}
            style={{
              width: 45,
              height: 45,
              borderRadius: 10,
              background: bg,
              flexShrink: 0,
              border: current === bg ? "3px solid #FFD700" : "2px solid #ddd",
              boxShadow:
                current === bg ? "0 0 8px rgba(255,215,0,0.8)" : "none",
              cursor: "pointer",
              transition: "0.2s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
