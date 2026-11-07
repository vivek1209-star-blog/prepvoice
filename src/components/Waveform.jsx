export default function Waveform({ levels, active }) {
  return (
    <div className="flex h-12 items-center gap-[3px]" aria-hidden>
      {levels.map((l, i) => (
        <span key={i} className={`w-[4px] rounded-full transition-[height] duration-75 ${active ? "bg-accent" : "bg-line"}`}
          style={{ height: `${Math.max(8, Math.round(l * 100))}%` }} />
      ))}
    </div>
  );
}
