import { type ChordShape, STRINGS, type Instrument } from "@/lib/chord-shapes";

type Props = {
  shape: ChordShape;
  instrument: Instrument;
  size?: number;
};

export function ChordDiagram({ shape, instrument, size = 160 }: Props) {
  const strings = STRINGS[instrument];
  const fretCount = 5;

  const padX = 18;
  const padTop = 32;
  const padBottom = 16;
  const width = size;
  const height = size + 14;

  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const stringSpacing = innerW / (strings - 1);
  const fretSpacing = innerH / fretCount;

  const baseFret = shape.baseFret ?? 1;
  const showNut = baseFret === 1;

  const stringX = (i: number) => padX + i * stringSpacing;
  const fretY = (i: number) => padTop + i * fretSpacing;

  // For ukulele: DB order is [G,C,E,A] but we display A first (leftmost)
  const rev = instrument === "ukulele";
  const di = (i: number) => rev ? strings - 1 - i : i; // data index for visual column i

  const fret = (i: number) => shape.frets[di(i)];
  const finger = (i: number) => shape.fingers?.[di(i)];

  // Barre: remap from/to for reversed layout
  const barre = shape.barre
    ? rev
      ? { ...shape.barre, from: strings - 1 - shape.barre.to, to: strings - 1 - shape.barre.from }
      : shape.barre
    : null;

  // Hawaiian tropical palette
  const boardFill = "#C8924C";
  const boardFill2 = "#A06A30";
  const nutFill = "#F5E6C2";
  const fretStroke = "#7A4E20";
  const stringStroke = "#D4A845";
  const dotFill = "#FF5F8F";    // flamingo
  const dotText = "#fff";
  const inlayFill = "#F0D898";

  const inlayFrets = [3, 5, 7, 9].filter(
    (fr) => fr >= baseFret && fr < baseFret + fretCount,
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="auto"
      style={{ maxWidth: width, display: "block" }}
      role="img"
      aria-label={`Diagramma accordo ${shape.name}`}
      className="select-none"
    >
      <defs>
        <linearGradient id="board-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={boardFill} />
          <stop offset="100%" stopColor={boardFill2} />
        </linearGradient>
      </defs>

      {/* Chord name */}
      <text
        x={width / 2} y={18}
        textAnchor="middle" fontSize="14" fontWeight="800"
        fill="var(--text)" fontFamily="ui-sans-serif, system-ui"
      >
        {shape.name}
      </text>

      {/* Fretboard */}
      <rect
        x={padX - 1} y={padTop}
        width={innerW + 2} height={innerH}
        rx={2} fill="url(#board-grad)"
      />

      {/* Nut */}
      {showNut && (
        <rect
          x={padX - 2} y={padTop - 5}
          width={innerW + 4} height={5}
          rx={1} fill={nutFill}
          stroke={fretStroke} strokeWidth={0.6}
        />
      )}

      {/* Base fret label */}
      {!showNut && (
        <text
          x={padX - 6} y={padTop + fretSpacing / 2 + 4}
          textAnchor="end" fontSize="9" fontWeight="600"
          fill="var(--muted)" fontFamily="ui-sans-serif, system-ui"
        >
          {baseFret}fr
        </text>
      )}

      {/* Fret lines */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padX} x2={padX + innerW}
          y1={fretY(i)} y2={fretY(i)}
          stroke={i === 0 && !showNut ? nutFill : fretStroke}
          strokeWidth={i === 0 && !showNut ? 2 : 1.2}
          strokeLinecap="round"
        />
      ))}

      {/* Position inlays */}
      {inlayFrets.map((fr) => (
        <circle
          key={`il${fr}`}
          cx={(stringX(0) + stringX(strings - 1)) / 2}
          cy={fretY(fr - baseFret) + fretSpacing / 2}
          r={2.5} fill={inlayFill} opacity={0.5}
        />
      ))}

      {/* Strings */}
      {Array.from({ length: strings }).map((_, i) => {
        // For guitar: lower strings (left) are thicker
        // For ukulele reversed: A (left) is thinnest
        const thickness = instrument === "guitar"
          ? 0.8 + (strings - 1 - i) * 0.18
          : 0.8 + i * 0.22; // ukulele reversed: G (right) thicker
        return (
          <line
            key={`s${i}`}
            x1={stringX(i)} x2={stringX(i)}
            y1={padTop} y2={padTop + innerH}
            stroke={stringStroke}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        );
      })}

      {/* Top markers — every string always gets one */}
      {Array.from({ length: strings }).map((_, i) => {
        const f = fret(i);
        const cx = stringX(i);
        const cy = padTop - 12;
        if (f === -1) {
          return (
            <text
              key={`top${i}`}
              x={cx} y={cy + 4}
              textAnchor="middle" fontSize="12" fontWeight="700"
              fill="var(--muted)" fontFamily="ui-sans-serif, system-ui"
            >×</text>
          );
        }
        if (f === 0) {
          return (
            <circle
              key={`top${i}`}
              cx={cx} cy={cy}
              r={4} fill="none"
              stroke="var(--text)" strokeWidth={1.3}
            />
          );
        }
        return (
          <circle
            key={`top${i}`}
            cx={cx} cy={cy}
            r={3.5} fill={dotFill}
          />
        );
      })}

      {/* Barre */}
      {barre && (
        <rect
          x={stringX(barre.from) - 7}
          y={fretY(barre.fret - baseFret) + fretSpacing / 2 - 7}
          width={stringX(barre.to) - stringX(barre.from) + 14}
          height={14} rx={7}
          fill={dotFill} opacity={0.9}
        />
      )}

      {/* Finger dots */}
      {Array.from({ length: strings }).map((_, i) => {
        const f = fret(i);
        if (f <= 0) return null;
        const relFret = f - baseFret;
        const cy = fretY(relFret) + fretSpacing / 2;
        const cx = stringX(i);
        const fg = finger(i);
        return (
          <g key={`d${i}`}>
            <circle cx={cx} cy={cy} r={9} fill={dotFill} />
            {fg ? (
              <text
                x={cx} y={cy + 3.5}
                textAnchor="middle" fontSize="10" fontWeight="800"
                fill={dotText} fontFamily="ui-sans-serif, system-ui"
              >{fg}</text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
