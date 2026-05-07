import { type ChordShape, STRINGS, type Instrument } from "@/lib/chord-shapes";

type Props = {
  shape: ChordShape;
  instrument: Instrument;
  size?: number;
};

// Hawaiian palette
const SAND   = "#E8D5A3";
const SAND2  = "#C4A96B";
const OCEAN  = "#29C5EE";
const PALM   = "#4A8C2A";
const DRIFTW = "#7A5C3A";   // driftwood frets
const IVORY  = "#FFF8E8";

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
  const fretSpacing   = innerH / fretCount;

  const baseFret = shape.baseFret ?? 1;
  const showNut  = baseFret === 1;

  const stringX = (i: number) => padX + i * stringSpacing;
  const fretY   = (i: number) => padTop + i * fretSpacing;

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
        <linearGradient id="haw-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SAND} />
          <stop offset="100%" stopColor={SAND2} />
        </linearGradient>
      </defs>

      {/* Chord name */}
      <text
        x={width / 2} y={19}
        textAnchor="middle" fontSize="14" fontWeight="800"
        fill="var(--text)" fontFamily="ui-sans-serif, system-ui"
      >
        {shape.name}
      </text>

      {/* Sand fretboard */}
      <rect
        x={padX - 1} y={padTop}
        width={innerW + 2} height={innerH}
        rx={2} fill="url(#haw-board)"
      />

      {/* Nut */}
      {showNut && (
        <rect
          x={padX - 2} y={padTop - 5}
          width={innerW + 4} height={5}
          rx={1} fill={IVORY}
          stroke={DRIFTW} strokeWidth={0.7}
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

      {/* Fret lines — driftwood colour */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padX} x2={padX + innerW}
          y1={fretY(i)} y2={fretY(i)}
          stroke={DRIFTW}
          strokeWidth={i === 0 && !showNut ? 2 : 1.1}
          strokeLinecap="round"
        />
      ))}

      {/* Inlay dots — ocean */}
      {inlayFrets.map((fr) => (
        <circle
          key={`il${fr}`}
          cx={(stringX(0) + stringX(strings - 1)) / 2}
          cy={fretY(fr - baseFret) + fretSpacing / 2}
          r={2.5} fill={OCEAN} opacity={0.35}
        />
      ))}

      {/* Strings — palm-dark lines */}
      {Array.from({ length: strings }).map((_, i) => (
        <line
          key={`s${i}`}
          x1={stringX(i)} x2={stringX(i)}
          y1={padTop} y2={padTop + innerH}
          stroke={DRIFTW}
          strokeWidth={instrument === "guitar" ? 0.8 + (strings - 1 - i) * 0.15 : 1}
          strokeLinecap="round"
        />
      ))}

      {/* Muted / open markers above nut */}
      {shape.frets.map((f, i) => {
        if (f === -1) {
          return (
            <text
              key={`m${i}`}
              x={stringX(i)} y={padTop - 7}
              textAnchor="middle" fontSize="12" fontWeight="700"
              fill="var(--muted)" fontFamily="ui-sans-serif, system-ui"
            >×</text>
          );
        }
        if (f === 0) {
          return (
            <circle
              key={`o${i}`}
              cx={stringX(i)} cy={padTop - 10}
              r={4} fill="none"
              stroke={OCEAN} strokeWidth={1.4}
            />
          );
        }
        return null;
      })}

      {/* Barre — ocean */}
      {shape.barre && (
        <rect
          x={stringX(shape.barre.from) - 7}
          y={fretY(shape.barre.fret - baseFret) + fretSpacing / 2 - 7}
          width={stringX(shape.barre.to) - stringX(shape.barre.from) + 14}
          height={14} rx={7}
          fill={OCEAN} opacity={0.88}
        />
      )}

      {/* Finger dots — palm green */}
      {shape.frets.map((f, i) => {
        if (f <= 0) return null;
        const cy = fretY(f - baseFret) + fretSpacing / 2;
        const cx = stringX(i);
        const fg  = shape.fingers?.[i];
        return (
          <g key={`d${i}`}>
            <circle cx={cx} cy={cy} r={9} fill={PALM} />
            {fg ? (
              <text
                x={cx} y={cy + 3.5}
                textAnchor="middle" fontSize="10" fontWeight="800"
                fill={IVORY} fontFamily="ui-sans-serif, system-ui"
              >{fg}</text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
