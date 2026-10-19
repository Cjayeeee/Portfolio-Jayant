import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import './Manifesto.css'

const CUES = [
  ['Cue 01', 'Motion with a reason. Every animation explains, guides or rewards.'],
  ['Cue 02', 'Performance is part of the design, not an afterthought.'],
  ['Cue 03', 'Details compound. Easing, spacing and timing are tuned by hand.'],
]

// hairline easing curves that sweep across the section (the site's recurring motif)
const CURVES = [
  'M -50 820 C 520 820, 640 120, 1490 90',
  'M -50 760 C 420 760, 760 220, 1490 210',
  'M -50 880 C 700 880, 600 40, 1490 20',
  'M -50 700 C 300 680, 900 380, 1490 330',
]

export default function Manifesto() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create('.mf__text', { type: 'words', wordsClass: 'mf__word' })
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.mf__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.utils.toArray('.mf__curve').forEach((p, i) => {
        const len = p.getTotalLength()
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: `top ${85 - i * 6}%`, end: 'center 40%', scrub: true },
          },
        )
      })
      gsap.from('.mf__cue', {
        y: '+=60',
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.mf__cues', start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="mf theme-dark" data-nav-theme="dark" aria-label="Approach">
      <svg className="mf__bg" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        {CURVES.map((d, i) => (
          <path key={i} d={d} className="mf__curve" />
        ))}
      </svg>

      <div className="wrap mf__inner">
        <div className="section-head mono">
          <span>(02) Approach</span>
          <span className="section-head__rule" />
          <span className="section-head__code">00:00:12</span>
        </div>

        <p className="mf__text display">
          I treat the browser like a <em className="serif-i">stage</em>, where every element gets an{' '}
          <em className="serif-i">entrance</em>, a reason to move, and a moment to rest.
        </p>

        <ol className="mf__cues">
          {CUES.map(([k, v]) => (
            <li key={k} className="mf__cue">
              <span className="mono mf__cue-k">
                <span className="kf" aria-hidden="true" /> {k}
              </span>
              <p>{v}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
