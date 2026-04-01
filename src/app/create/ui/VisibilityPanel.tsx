
const options = [
  { key: "Public", label: "Public", desc: "Everyone on DolRise can view" },
  { key: "Friends", label: "Friends", desc: "Only your connections can see" },
  { key: "Private", label: "Private", desc: "Only you can view this" },
];

export default function VisibilityPanel({
  visibility,
  setVisibility,
  reflect,
  setReflect,
  reecho,
  setReecho,
}: any) {
  return (
    <div className="vp-wrapper">
      <h3 className="vp-title">Visibility</h3>

      <div className="vp-options">
        {options.map((o) => (
          <div
            key={o.key}
            className={visibility === o.key ? "vp-item vp-active" : "vp-item"}
            onClick={() => setVisibility(o.key)}
          >
            <div className="vp-label">{o.label}</div>
            <div className="vp-desc">{o.desc}</div>
          </div>
        ))}
      </div>

      <div className="vp-subsection">
        <label className="vp-switch">
          <input
            type="checkbox"
            checked={reflect === "on"}
            onChange={(e) => setReflect(e.target.checked ? "on" : "off")}
          />
          <span className="vp-slider" />
        </label>
        <span className="vp-text">Allow Reflect</span>
      </div>

      <div className="vp-subsection">
        <label className="vp-switch">
          <input
            type="checkbox"
            checked={reecho === "on"}
            onChange={(e) => setReecho(e.target.checked ? "on" : "off")}
          />
          <span className="vp-slider" />
        </label>
        <span className="vp-text">Allow ReEcho</span>
      </div>
    </div>
  );
}
