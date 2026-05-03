"use client";

import { splitFiltered } from "@/lib/parental-filter";

export function FilteredText({ text, safe }: { text: string; safe: boolean }) {
  if (!safe) return <>{text}</>;
  const segments = splitFiltered(text);
  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "plain" ? (
          <span key={i}>{seg.text}</span>
        ) : (
          <CorrectionPatch key={i} replacement={seg.replacement} />
        )
      )}
    </>
  );
}

function CorrectionPatch({ replacement }: { replacement: string }) {
  return (
    <span
      aria-label={replacement}
      className="relative mx-[1px] inline-block rounded-[3px] px-1 py-[1px]"
      style={{
        background: "linear-gradient(135deg, #fffde4 60%, #fff8c0 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        transform: "rotate(-0.8deg)",
      }}
    >
      {/* faint texture lines mimicking correction fluid */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[3px] opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180,160,0,0.3) 3px, rgba(180,160,0,0.3) 4px)",
        }}
      />
      <span
        className="relative italic"
        style={{
          color: "#1a3a8f",
          fontFamily: "cursive, ui-sans-serif",
          fontStyle: "italic",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        {replacement}
      </span>
    </span>
  );
}
