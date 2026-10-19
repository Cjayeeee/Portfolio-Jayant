/**
 * Generated cover compositions, used until a real screenshot is set in data/site.js.
 * Each is a small "motion study" in the site's visual language.
 */
export default function ProjectArt({ variant = 1, label }) {
  const common = { viewBox: '0 0 1600 1000', preserveAspectRatio: 'xMidYMid slice', className: `art art--${variant}`, role: 'img', 'aria-label': label }

  if (variant === 'marrow') {
    // Title card in the project's own palette (dark + vivid orange). Replace with a real screenshot via `image`.
    const vertebrae = Array.from({ length: 9 })
    return (
      <svg {...common} viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#0E0D0C" />
        <g className="art__curves">
          {vertebrae.map((_, i) => {
            const w = 150 - Math.abs(i - 4) * 14
            return <rect key={i} x={1310 - w / 2} y={90 + i * 52} width={w} height={40} rx={20} fill={i === 4 ? '#FF5B1F' : 'none'} stroke="#FF5B1F" strokeWidth="3" />
          })}
          <line x1="1310" y1="60" x2="1310" y2="560" stroke="#FF5B1F" strokeWidth="2" strokeDasharray="2 10" />
        </g>
        <text x="180" y="120" fill="#ECE6DA" fontFamily="JetBrains Mono, monospace" fontSize="24" letterSpacing="3">MARROW / BRANDS WITH BACKBONE</text>
        <text x="180" y="160" fill="#FF5B1F" fontFamily="JetBrains Mono, monospace" fontSize="24" letterSpacing="3">STUDIO WEBSITE · 2026</text>
        <g className="art__type">
          <text x="170" y="800" fill="#ECE6DA" fontFamily="Archivo Variable, Archivo, sans-serif" fontWeight="900" fontSize="360" letterSpacing="-20" textLength="1260" lengthAdjust="spacingAndGlyphs" style={{ fontVariationSettings: "'wdth' 112" }}>
            MARROW
          </text>
        </g>
      </svg>
    )
  }

  if (variant === 'keisha') {
    // Title card in the project's palette (forest green, cream, dragon-fruit pink). Replace via `image`/`video`.
    const scales = Array.from({ length: 10 })
    return (
      <svg {...common} viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#1F3A2B" />
        <g className="art__orb">
          {scales.map((_, i) => {
            const a = (i / scales.length) * Math.PI * 2
            const x = 1260 + Math.cos(a) * 205
            const y = 420 + Math.sin(a) * 235
            return (
              <path
                key={i}
                d={`M ${1260 + Math.cos(a) * 120} ${420 + Math.sin(a) * 140} Q ${x + Math.cos(a + 0.9) * 40} ${y + Math.sin(a + 0.9) * 40} ${x + Math.cos(a) * 70} ${y + Math.sin(a) * 70}`}
                fill="none"
                stroke="#7FA65A"
                strokeWidth="16"
                strokeLinecap="round"
              />
            )
          })}
          <ellipse cx="1260" cy="420" rx="200" ry="235" fill="#E8357C" />
          <ellipse cx="1260" cy="420" rx="150" ry="182" fill="#F7EFE2" />
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={i} cx={1260 + Math.cos(i * 2.4) * (20 + (i % 6) * 22)} cy={420 + Math.sin(i * 2.4) * (24 + (i % 6) * 26)} r="5" fill="#1B1B1B" />
          ))}
        </g>
        <text x="180" y="130" fill="#F7EFE2" fontFamily="JetBrains Mono, monospace" fontSize="24" letterSpacing="3">KEISHA AGRO / DRAGON FRUIT FARM</text>
        <text x="180" y="170" fill="#E8357C" fontFamily="JetBrains Mono, monospace" fontSize="24" letterSpacing="3">FARM-TO-TABLE · 2026</text>
        <g className="art__type">
          <text x="170" y="540" fill="#F7EFE2" fontFamily="Archivo Variable, Archivo, sans-serif" fontWeight="900" fontSize="200" letterSpacing="-10">KEISHA</text>
          <text x="170" y="730" fill="#E8357C" fontFamily="Archivo Variable, Archivo, sans-serif" fontWeight="900" fontSize="200" letterSpacing="-10">AGRO</text>
        </g>
      </svg>
    )
  }

  if (variant === 1) {
    return (
      <svg {...common}>
        <rect width="1600" height="1000" fill="#2A35E0" />
        <g className="art__curves" fill="none" stroke="#ECE6DA" strokeWidth="2">
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d={`M -40 ${940 - i * 8} C ${560 + i * 18} ${940 - i * 8}, ${700 - i * 14} ${120 + i * 26}, 1640 ${80 + i * 26}`} opacity={1 - i * 0.06} />
          ))}
        </g>
        <circle className="art__orb" cx="1180" cy="300" r="120" fill="#ECE6DA" />
        <circle cx="1180" cy="300" r="190" fill="none" stroke="#ECE6DA" strokeWidth="2" strokeDasharray="4 10" />
        <text x="80" y="120" fill="#ECE6DA" fontFamily="JetBrains Mono, monospace" fontSize="30" letterSpacing="2">01 / STUDY / CURVES</text>
      </svg>
    )
  }

  if (variant === 2) {
    const cols = 12
    const rows = 7
    return (
      <svg {...common}>
        <rect width="1600" height="1000" fill="#14120F" />
        <g className="art__grid">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const t = c / (cols - 1)
              const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
              const isRow = r === 3
              const y = 220 + r * 95 - (isRow ? eased * 0 : 0)
              const x = 170 + c * 115
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={isRow ? 170 + eased * 1265 : x}
                  cy={y}
                  r={isRow ? 14 : 5}
                  fill={isRow ? '#8E95FF' : 'rgba(236,230,218,0.35)'}
                />
              )
            }),
          )}
        </g>
        <rect className="art__bar" x="120" y="480" width="1360" height="2" fill="#ECE6DA" opacity="0.25" />
        <circle className="art__orb" cx="1300" cy="240" r="150" fill="#2A35E0" />
        <text x="80" y="120" fill="#ECE6DA" fontFamily="JetBrains Mono, monospace" fontSize="30" letterSpacing="2">02 / STUDY / SPACING</text>
      </svg>
    )
  }

  return (
    <svg {...common}>
      <rect width="1600" height="1000" fill="#D6CEBA" />
      <g className="art__type">
        <text x="70" y="900" fill="#14120F" fontFamily="Story Script, cursive" fontSize="860" letterSpacing="-30">03</text>
      </g>
      <rect className="art__orb" x="980" y="180" width="440" height="560" fill="#2A35E0" />
      <g stroke="#14120F" strokeWidth="2">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1="980" x2="1420" y1={800 + i * 14} y2={800 + i * 14} opacity={1 - i * 0.1} />
        ))}
      </g>
      <text x="80" y="120" fill="#14120F" fontFamily="JetBrains Mono, monospace" fontSize="30" letterSpacing="2">03 / STUDY / TYPE</text>
    </svg>
  )
}
