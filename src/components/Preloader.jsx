import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import './Preloader.css'

const TOTAL_FRAMES = 120
// power3.inOut drawn as a cubic bezier in a 0–100 box (y inverted for SVG)
const CURVE = 'M0 100 C 65 100, 35 0, 100 0'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const finish = () => {
        onDone?.()
      }

      if (prefersReducedMotion()) {
        finish()
        setGone(true)
        return
      }

      const path = root.current.querySelector('.pl__curve')
      const dot = root.current.querySelector('.pl__dot')
      const counter = root.current.querySelector('.pl__count')
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })

      const state = { p: 0 }
      const tl = gsap.timeline({ paused: true })

      tl.from('.pl__fade', { autoAlpha: 0, y: 10, stagger: 0.06, duration: 0.6 }, 0)
        .from('.pl__axis', { scaleX: 0, scaleY: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .to(
          state,
          {
            p: 1,
            duration: 1.5,
            ease: 'none',
            onUpdate: () => {
              const p = state.p
              const pt = path.getPointAtLength(len * p)
              gsap.set(path, { strokeDashoffset: len * (1 - p) })
              gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } })
              counter.textContent = String(Math.round(p * TOTAL_FRAMES)).padStart(3, '0')
            },
          },
          0.15,
        )
        .to('.pl__name-inner', { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 }, 0.5)
        .addLabel('exit', '+=0.15')
        .to('.pl__stage', { y: -40, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 'exit')
        .call(finish, null, 'exit+=0.35')
        .to(root.current, { yPercent: -100, duration: 1.0, ease: 'expo.inOut' }, 'exit+=0.25')
        .to('.pl__skirt path', { attr: { d: 'M0 0 Q 50 0 100 0 L100 0 L0 0Z' }, duration: 1.0, ease: 'expo.inOut' }, 'exit+=0.25')
        .call(() => setGone(true))

      gsap.set('.pl__name-inner', { yPercent: 110 })

      // start once webfonts are ready (or after a short safety timeout)
      let started = false
      const start = () => {
        if (started) return
        started = true
        tl.play()
      }
      const fonts = document.fonts?.ready ?? Promise.resolve()
      fonts.then(start)
      const safety = setTimeout(start, 1200)
      return () => {
        started = true // prevent a reverted timeline (StrictMode) from starting
        clearTimeout(safety)
      }
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div ref={root} className="pl theme-dark" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="pl__stage">
        <div className="pl__top wrap">
          <span className="mono pl__fade">J.C. / Motion score</span>
          <span className="mono pl__fade">Portfolio / 2026</span>
        </div>

        <div className="pl__center">
          <div className="pl__graph pl__fade" aria-hidden="true">
            <svg viewBox="-6 -6 112 112" preserveAspectRatio="none">
              <line className="pl__axis" x1="0" y1="100" x2="100" y2="100" />
              <line className="pl__axis pl__axis--y" x1="0" y1="100" x2="0" y2="0" />
              <path className="pl__ghost" d={CURVE} />
              <path className="pl__curve" d={CURVE} />
              <circle className="pl__dot" cx="0" cy="100" r="2.6" />
            </svg>
            <span className="mono pl__ease">ease: power3.inOut</span>
          </div>

          <p className="pl__name" aria-hidden="true">
            <span className="pl__name-line"><span className="pl__name-inner">Jayant</span></span>
            <span className="pl__name-line"><span className="pl__name-inner serif-i">Chaudhari</span></span>
          </p>
        </div>

        <div className="pl__bottom wrap">
          <span className="mono pl__fade">Setting keyframes</span>
          <span className="mono pl__fade">
            Frame <span className="pl__count">000</span> / {TOTAL_FRAMES}
          </span>
        </div>
      </div>

      <svg className="pl__skirt" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 Q 50 20 100 0 L100 0 L0 0Z" />
      </svg>
    </div>
  )
}
