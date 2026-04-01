
export default function CreateHeader({ onBack }: any) {
  return (
    <div className="create-header">
      <button className="ch-back" onClick={onBack}>
        ←
      </button>

      <h2 className="ch-title">Create Moment</h2>

      <div style={{ width: 40 }}></div>
    </div>
  );
}
