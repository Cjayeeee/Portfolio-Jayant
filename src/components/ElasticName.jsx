import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * Variable-font "elastic" type: each letter's width axis (wdth 62–125)
 * swells near the pointer. When idle, a virtual cursor drifts across
 * so the name keeps breathing. Pure rAF, paused off-screen.
 */
const W_MIN = 78
const W_MAX = 125

export default function ElasticName({ lines, className = '', tag = null }) {
  const root = useRef(null)

  // Fit font-size so the widest line fills the container
  useEffect(() => {
    const el = root.current
    if (!el) return
    const fit = () => {
      const lineEls = el.querySelectorAll('.ename__line')
      el.style.setProperty('--ename-size', '100px')
      el.classList.add('is-measuring')
      let widest = 0
      // measure glyph extents only (ignores any absolutely-positioned tag)
      lineEls.forEach((l) => {
        const chs = l.querySelectorAll('.ename__ch')
        if (!chs.length) return
        const w = chs[chs.length - 1].getBoundingClientRect().right - chs[0].getBoundingClientRect().left
        widest = Math.max(widest, w)
      })
      el.classList.remove('is-measuring')
      const avail = el.clientWidth
      if (widest) el.style.setProperty('--ename-size', `${Math.floor((avail / widest) * 100 * 0.97)}px`)
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const letters = Array.from(el.querySelectorAll('.ename__ch'))
    const state = letters.map(() => 92)
    let pointer = { x: 0, y: 0, t: -1e9 }
    let raf = 0
    let visible = true
    const start = performance.now()

    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY, t: performance.now() }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(el)

    function loop(now) {
      raf = 0
      if (!visible) return
      const rect = el.getBoundingClientRect()
      const active = now - pointer.t < 2200 && pointer.y > rect.top - 200 && pointer.y < rect.bottom + 200
      // idle: a slow sine sweep across the name
      const idleX = rect.left + rect.width * (0.5 + 0.48 * Math.sin((now - start) / 2100))
      const cx = active ? pointer.x : idleX
      const sigma = rect.width * 0.11

      // read all positions first, then write (one layout per frame)
      const centers = letters.map((ch) => {
        const r = ch.getBoundingClientRect()
        return r.left + r.width / 2
      })
      letters.forEach((ch, i) => {
        const dx = centers[i] - cx
        const g = Math.exp(-(dx * dx) / (2 * sigma * sigma))
        const target = W_MIN + (W_MAX - W_MIN) * g
        state[i] += (target - state[i]) * 0.12
        ch.style.fontVariationSettings = `'wdth' ${state[i].toFixed(1)}`
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <span ref={root} className={`ename ${className}`}>
      {lines.map((line, li) => (
        <span key={li} className={`ename__line ename__line--${li}`} aria-hidden="true">
          {line.split('').map((c, i) => (
            <span key={i} className="ename__mask">
              <span className="ename__ch">{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
          {li === 0 && tag}
        </span>
      ))}
    </span>
  )
}
