import { type ChordShape, STRINGS, type Instrument } from "@/lib/chord-shapes";

type Props = {
  shape: ChordShape;
  instrument: Instrument;
  size?: number;
};

export function ChordDiagram({ shape, instrument, size = 140 }: Props) {
  const strings = STRINGS[instrument];
  const fretCount = 5;

  const padX = 16;
  const padTop = 28;
  const padBottom = 18;
  const width = size;
  const height = size + 16;

  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const stringSpacing = innerW / (strings - 1);
  const fretSpacing = innerH / fretCount;

  const baseFret = shape.baseFret ?? 1;
  const showNut = baseFret === 1;

  const stringX = (i: number) => padX + i * stringSpacing;
  const fretY = (i: number) => padTop + i * fretSpacing;

  const stroke = "#1a1d24";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`Diagramma accordo ${shape.name} per ${instrument === "guitar" ? "chitarra" : "ukulele"}`}
      className="select-none"
    >
      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={stroke}
        fontFamily="ui-sans-serif, system-ui"
      >
        {shape.name}
      </text>

      {showNut && (
        <rect
          x={padX - 1}
          y={padTop - 4}
          width={innerW + 2}
          height={4}
          fill={stroke}
        />
      )}

      {!showNut && (
        <text
          x={padX - 6}
          y={padTop + fretSpacing / 2 + 4}
          textAnchor="end"
          fontSize="10"
          fill={stroke}
          fontFamily="ui-sans-serif, system-ui"
        >
          {baseFret}fr
        </text>
      )}

      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padX}
          x2={padX + innerW}
          y1={fretY(i)}
          y2={fretY(i)}
          stroke={stroke}
          strokeWidth={i === 0 && !showNut ? 1.5 : 1}
        />
      ))}

      {Array.from({ length: strings }).map((_, i) => (
        <line
          key={`s${i}`}
          x1={stringX(i)}
          x2={stringX(i)}
          y1={padTop}
          y2={padTop + innerH}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}

      {shape.frets.map((f, i) => {
        if (f === -1) {
          return (
            <text
              key={`m${i}`}
              x={stringX(i)}
              y={padTop - 8}
              textAnchor="middle"
              fontSize="12"
              fill={stroke}
              fontFamily="ui-sans-serif, system-ui"
            >
              ×
            </text>
          );
        }
        if (f === 0) {
          return (
            <circle
              key={`o${i}`}
              cx={stringX(i)}
              cy={padTop - 9}
              r={4}
              fill="none"
              stroke={stroke}
              strokeWidth={1.2}
            />
          );
        }
        return null;
      })}

      {shape.barre && (
        <rect
          x={stringX(shape.barre.from) - 6}
          y={fretY(shape.barre.fret - baseFret) + fretSpacing / 2 - 6}
          width={stringX(shape.barre.to) - stringX(shape.barre.from) + 12}
          height={12}
          rx={6}
          fill={stroke}
          opacity={0.85}
        />
      )}

      {shape.frets.map((f, i) => {
        if (f <= 0) return null;
        const relFret = f - baseFret;
        const cy = fretY(relFret) + fretSpacing / 2;
        const cx = stringX(i);
        const finger = shape.fingers?.[i];
        return (
          <g key={`d${i}`}>
            <circle cx={cx} cy={cy} r={8.5} fill={stroke} />
            {finger ? (
              <text
                x={cx}
                y={cy + 3.5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#fff"
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
