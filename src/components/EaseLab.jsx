import { useCallback, useRef, useState } from 'react'
import './EaseLab.css'

const PRESETS = [
  { name: 'power3.inOut', v: [0.65, 0, 0.35, 1] },
  { name: 'expo.out', v: [0.16, 1, 0.3, 1] },
  { name: 'back.out', v: [0.34, 1.56, 0.64, 1] },
  { name: 'sine.inOut', v: [0.37, 0, 0.63, 1] },
]

// graph geometry (SVG units)
const PAD = 28
const SIZE = 200
const BOX = SIZE - PAD * 2
const Y_MIN = -0.6
const Y_MAX = 1.6

const toSvg = (x, y) => [PAD + x * BOX, PAD + (1 - y) * BOX]
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const r2 = (n) => Math.round(n * 100) / 100

export default function EaseLab() {
  const [v, setV] = useState(PRESETS[0].v)
  const [preset, setPreset] = useState(PRESETS[0].name)
  const [copied, setCopied] = useState(false)
  const svgRef = useRef(null)

  const value = `cubic-bezier(${v.map((n) => n.toFixed(2)).join(', ')})`

  const setHandle = useCallback((i, x, y) => {
    setV((prev) => {
      const next = [...prev]
      next[i * 2] = r2(clamp(x, 0, 1))
      next[i * 2 + 1] = r2(clamp(y, Y_MIN, Y_MAX))
      return next
    })
    setPreset('custom')
  }, [])

  const onPointerDown = (i) => (e) => {
    e.preventDefault()
    const target = e.currentTarget
    target.setPointerCapture(e.pointerId)
    const move = (ev) => {
      const rect = svgRef.current.getBoundingClientRect()
      const sx = ((ev.clientX - rect.left) / rect.width) * SIZE
      const sy = ((ev.clientY - rect.top) / rect.height) * SIZE
      setHandle(i, (sx - PAD) / BOX, 1 - (sy - PAD) / BOX)
    }
    const up = () => {
      target.removeEventListener('pointermove', move)
      target.removeEventListener('pointerup', up)
      target.removeEventListener('pointercancel', up)
    }
    target.addEventListener('pointermove', move)
    target.addEventListener('pointerup', up)
    target.addEventListener('pointercancel', up)
  }

  const onKey = (i) => (e) => {
    const step = e.shiftKey ? 0.1 : 0.02
    const x = v[i * 2]
    const y = v[i * 2 + 1]
    const map = {
      ArrowLeft: [x - step, y],
      ArrowRight: [x + step, y],
      ArrowUp: [x, y + step],
      ArrowDown: [x, y - step],
    }
    if (map[e.key]) {
      e.preventDefault()
      setHandle(i, ...map[e.key])
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const [p0x, p0y] = toSvg(0, 0)
  const [p3x, p3y] = toSvg(1, 1)
  const [h1x, h1y] = toSvg(v[0], v[1])
  const [h2x, h2y] = toSvg(v[2], v[3])
  const pct = (sx, sy) => ({ left: `${(sx / SIZE) * 100}%`, top: `${(sy / SIZE) * 100}%` })

  return (
    <div className="lab theme-dark" style={{ '--lab-ease': value }}>
      <div className="lab__head">
        <span className="mono">Ease lab</span>
        <span className="mono lab__hint">Drag the handles</span>
      </div>

      <div className="lab__graph">
        <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <defs>
            <pattern id="labgrid" width={BOX / 4} height={BOX / 4} patternUnits="userSpaceOnUse" x={PAD} y={PAD}>
              <path d={`M ${BOX / 4} 0 L 0 0 0 ${BOX / 4}`} fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x={PAD} y={PAD} width={BOX} height={BOX} fill="url(#labgrid)" className="lab__grid" />
          <rect x={PAD} y={PAD} width={BOX} height={BOX} fill="none" className="lab__frame" />
          <line x1={p0x} y1={p0y} x2={p3x} y2={p3y} className="lab__linear" />
          <line x1={p0x} y1={p0y} x2={h1x} y2={h1y} className="lab__arm" />
          <line x1={p3x} y1={p3y} x2={h2x} y2={h2y} className="lab__arm" />
          <path d={`M ${p0x} ${p0y} C ${h1x} ${h1y}, ${h2x} ${h2y}, ${p3x} ${p3y}`} className="lab__curve" />
          <circle cx={p0x} cy={p0y} r="3.5" className="lab__end" />
          <circle cx={p3x} cy={p3y} r="3.5" className="lab__end" />
        </svg>
        {[0, 1].map((i) => {
          const [sx, sy] = i === 0 ? [h1x, h1y] : [h2x, h2y]
          return (
            <button
              key={i}
              type="button"
              className="lab__handle"
              data-cursor="Drag"
              style={pct(sx, sy)}
              onPointerDown={onPointerDown(i)}
              onKeyDown={onKey(i)}
              aria-label={`Control point ${i + 1}: x ${v[i * 2]}, y ${v[i * 2 + 1]}. Use arrow keys to move, hold Shift for larger steps.`}
            />
          )
        })}
      </div>

      <div className="lab__race" aria-hidden="true">
        <div className="lab__lane">
          <span className="lab__ball lab__ball--linear" />
          <span className="mono lab__lane-label">linear</span>
        </div>
        <div className="lab__lane">
          <span className="lab__ball lab__ball--eased" />
          <span className="mono lab__lane-label">{preset}</span>
        </div>
      </div>

      <div className="lab__presets" role="group" aria-label="Easing presets">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            className={`lab__preset mono ${preset === p.name ? 'is-active' : ''}`}
            aria-pressed={preset === p.name}
            onClick={() => {
              setV(p.v)
              setPreset(p.name)
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="lab__out">
        <code className="lab__code">{value}</code>
        <button type="button" className="lab__copy mono" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Easing value copied to clipboard' : ''}
        </span>
      </div>
    </div>
  )
}
