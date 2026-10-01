type Props = { slug: string; className?: string };

function seed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ProjectCover({ slug, className = '' }: Props) {
  const COLS = 18;
  const ROWS = 7;
  const S = 14;
  const G = 4;
  const rnd = seed(slug);

  const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
    const r = rnd();
    const state = r > 0.965 ? 'fail' : r > 0.9 ? 'warn' : r > 0.18 ? 'pass' : 'idle';
    return {
      x: (i % COLS) * (S + G),
      y: Math.floor(i / COLS) * (S + G),
      state,
    };
  });

  const w = COLS * (S + G) - G;
  const h = ROWS * (S + G) - G;

  return (
    <svg
      className={`project-cover ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={S}
          height={S}
          rx="1"
          className={`cell cell--${c.state}`}
          style={{ animationDelay: `${(i % COLS) * 35 + Math.floor(i / COLS) * 20}ms` }}
        />
      ))}
    </svg>
  );
}
