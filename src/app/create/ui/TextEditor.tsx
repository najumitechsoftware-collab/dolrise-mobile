
export default function TextEditor({ text, setText }: any) {
  return (
    <div className="te-wrapper">
      <h3 className="te-title">Write Something</h3>

      <textarea
        className="te-input"
        placeholder="Express your thoughts beautifully…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
