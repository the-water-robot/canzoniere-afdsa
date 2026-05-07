import { type ChordShape, STRINGS, type Instrument } from "@/lib/chord-shapes";

type Props = {
  shape: ChordShape;
  instrument: Instrument;
  size?: number;
};

export function ChordDiagram({ shape, instrument, size = 180 }: Props) {
  const strings = STRINGS[instrument];
  const fretCount = 5;

  const padX = 22;
  const padTop = 38;
  const padBottom = 14;
  const width = size;
  const height = size + 18;

  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const stringSpacing = innerW / (strings - 1);
  const fretSpacing = innerH / fretCount;

  const baseFret = shape.baseFret ?? 1;
  const showNut = baseFret === 1;

  const stringX = (i: number) => padX + i * stringSpacing;
  const fretY = (i: number) => padTop + i * fretSpacing;

  // Hawaiian wood palette
  const wood1 = "#B6764A";
  const wood2 = "#7A4621";
  const fretMetal = "#D9C9AE";
  const stringGold = "#E8C76A";
  const inlay = "#F2E2C0";
  const dotDark = "#22150C";
  const ivory = "#FFF6E2";

  // Inlay positions (relative fret numbers from the chord's baseFret)
  const inlayFrets = [3, 5, 7, 9].filter(
    (fr) => fr >= baseFret && fr < baseFret + fretCount,
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="auto"
      role="img"
      aria-label={`Diagramma accordo ${shape.name}`}
      className="block max-w-full select-none"
      style={{ maxWidth: width }}
    >
      <defs>
        <linearGradient id="cd-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wood1} />
          <stop offset="55%" stopColor="#9A5A30" />
          <stop offset="100%" stopColor={wood2} />
        </linearGradient>
        <linearGradient id="cd-string" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A88748" />
          <stop offset="50%" stopColor={stringGold} />
          <stop offset="100%" stopColor="#A88748" />
        </linearGradient>
        <pattern id="cd-grain" x="0" y="0" width="2" height="6" patternUnits="userSpaceOnUse">
          <rect width="2" height="6" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#000" strokeOpacity="0.06" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Chord name */}
      <text
        x={width / 2}
        y={20}
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="var(--text)"
        fontFamily="ui-sans-serif, system-ui"
      >
        {shape.name}
      </text>

      {/* Wooden fretboard */}
      <rect
        x={padX - 2}
        y={padTop - 2}
        width={innerW + 4}
        height={innerH + 4}
        rx={3}
        fill="url(#cd-wood)"
      />
      <rect
        x={padX - 2}
        y={padTop - 2}
        width={innerW + 4}
        height={innerH + 4}
        rx={3}
        fill="url(#cd-grain)"
      />

      {/* Nut */}
      {showNut && (
        <rect
          x={padX - 3}
          y={padTop - 5}
          width={innerW + 6}
          height={5}
          rx={1}
          fill="#F4E5C7"
          stroke="#5C3A1E"
          strokeWidth={0.8}
        />
      )}

      {/* Base fret label */}
      {!showNut && (
        <text
          x={padX - 8}
          y={padTop + fretSpacing / 2 + 3}
          textAnchor="end"
          fontSize="9"
          fontWeight="700"
          fill="var(--muted)"
          fontFamily="ui-sans-serif, system-ui"
        >
          {baseFret}fr
        </text>
      )}

      {/* Frets (metal lines) */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padX - 2}
          x2={padX + innerW + 2}
          y1={fretY(i)}
          y2={fretY(i)}
          stroke={fretMetal}
          strokeWidth={i === 0 && !showNut ? 2 : 1.4}
          strokeLinecap="round"
        />
      ))}

      {/* Position inlay dots */}
      {inlayFrets.map((fr) => {
        const relFret = fr - baseFret;
        const cy = fretY(relFret) + fretSpacing / 2;
        const cx = (stringX(0) + stringX(strings - 1)) / 2;
        return (
          <circle
            key={`il${fr}`}
            cx={cx}
            cy={cy}
            r={2.4}
            fill={inlay}
            opacity={0.55}
          />
        );
      })}

      {/* Strings (gold) — thicker on lower strings */}
      {Array.from({ length: strings }).map((_, i) => {
        const thickness = instrument === "guitar"
          ? 1.6 - i * 0.18
          : 1.2 + (i === 0 ? 0.2 : 0);
        return (
          <line
            key={`s${i}`}
            x1={stringX(i)}
            x2={stringX(i)}
            y1={padTop}
            y2={padTop + innerH}
            stroke="url(#cd-string)"
            strokeWidth={Math.max(0.8, thickness)}
            strokeLinecap="round"
          />
        );
      })}

      {/* Top markers — one per string, always */}
      {shape.frets.map((f, i) => {
        const cx = stringX(i);
        const cy = padTop - 13;
        if (f === -1) {
          // Muted ×
          return (
            <text
              key={`top${i}`}
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--muted)"
              fontFamily="ui-sans-serif, system-ui"
            >
              ×
            </text>
          );
        }
        if (f === 0) {
          // Open O
          return (
            <circle
              key={`top${i}`}
              cx={cx}
              cy={cy}
              r={4}
              fill="none"
              stroke="var(--text)"
              strokeWidth={1.4}
            />
          );
        }
        // Fretted ●
        return (
          <circle
            key={`top${i}`}
            cx={cx}
            cy={cy}
            r={3.5}
            fill={dotDark}
          />
        );
      })}

      {/* Barre */}
      {shape.barre && (
        <rect
          x={stringX(shape.barre.from) - 7}
          y={fretY(shape.barre.fret - baseFret) + fretSpacing / 2 - 7}
          width={stringX(shape.barre.to) - stringX(shape.barre.from) + 14}
          height={14}
          rx={7}
          fill={dotDark}
          opacity={0.92}
        />
      )}

      {/* Finger dots on fretboard */}
      {shape.frets.map((f, i) => {
        if (f <= 0) return null;
        const relFret = f - baseFret;
        const cy = fretY(relFret) + fretSpacing / 2;
        const cx = stringX(i);
        const finger = shape.fingers?.[i];
        return (
          <g key={`d${i}`}>
            <circle cx={cx} cy={cy} r={9.5} fill={dotDark} />
            <circle cx={cx} cy={cy} r={9.5} fill="none" stroke="#000" strokeOpacity={0.3} strokeWidth={0.6} />
            {finger ? (
              <text
                x={cx}
                y={cy + 3.6}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="800"
                fill={ivory}
                fontFamily="ui-sans-serif, system-ui"
              >
                {finger}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
