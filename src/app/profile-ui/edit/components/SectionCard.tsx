export default function SectionCard({
  title,
  open,
  onToggle,
  children,
}: any) {
  return (
    <section className={`section-card ${open ? "open" : ""}`}>
      <header onClick={onToggle}>
        <h3>{title}</h3>
        <span>{open ? "−" : "+"}</span>
      </header>
      {open && <div className="section-body">{children}</div>}
    </section>
  );
}
