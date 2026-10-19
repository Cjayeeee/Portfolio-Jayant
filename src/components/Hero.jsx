import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { scrollToTarget } from '../lib/scroll'
import { profile, strengths } from '../data/site'
import ElasticName from './ElasticName'
import EaseLab from './EaseLab'
import { Arrow } from './Icons'
import './Hero.css'

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!ready) {
        gsap.set('.ename__ch', { yPercent: 105 })
        return
      }
      const split = SplitText.create('.hero__headline', { type: 'lines', mask: 'lines', linesClass: 'line' })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
      tl.to('.ename__ch', { yPercent: 0, stagger: { each: 0.035, from: 'start' } }, 0.1)
        .from(split.lines, { yPercent: 105, stagger: 0.08 }, 0.45)
        .from('.hero__meta > *', { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.3)
        .from('.hero__copy, .hero__ctas > *', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.6)
        .from('.hero__lab', { y: 50, autoAlpha: 0, rotate: 2, duration: 1.3 }, 0.55)
        .from('.hero__strengths li', { y: 12, autoAlpha: 0, stagger: 0.05, duration: 0.8 }, 0.8)
        .from('.hero__track-fill', { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0.5)
        .from('.hero__tag', { autoAlpha: 0, scale: 0.8, rotate: -8, duration: 1 }, 0.7)
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section id="top" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        <div className="hero__meta mono" data-intro>
          <span>(01) Index</span>
          <span className="hero__meta-mid">{profile.role}, based in {profile.location}</span>
          <span className="hero__meta-end">
            <span className="kf" aria-hidden="true" /> {profile.availability}
          </span>
        </div>

        <h1 id="hero-title" className="hero__title">
          <span className="sr-only">
            {profile.name}, {profile.role}
          </span>
          <ElasticName
            lines={[profile.firstName, profile.lastName]}
            className="display"
            tag={
              <span className="hero__tag serif-i" aria-hidden="true">
                creative frontend developer
              </span>
            }
          />
          <span className="hero__tag hero__tag--mobile serif-i" aria-hidden="true">
            creative frontend developer
          </span>
        </h1>

        <div className="hero__grid">
          <div className="hero__left">
            <p className="hero__headline serif-i">Interfaces with a sense of timing.</p>
            <p className="hero__copy">
              I build responsive, animated websites in React and GSAP: scroll-driven stories, considered
              micro-interactions and motion that explains rather than decorates. Design-minded, detail-obsessed,
              shipped with performance in mind.
            </p>
            <div className="hero__ctas">
              <a href="#work" className="pill pill--solid" onClick={(e) => (e.preventDefault(), scrollToTarget('work'))}>
                Explore selected work <Arrow dir="down" />
              </a>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="pill" target="_blank" rel="noreferrer">
                  View résumé <Arrow dir="ne" />
                </a>
              ) : (
                <a
                  href="#contact"
                  className="pill"
                  onClick={(e) => (e.preventDefault(), scrollToTarget('contact'))}
                >
                  Start a conversation <Arrow />
                </a>
              )}
            </div>
          </div>

          <div className="hero__lab" data-intro>
            <EaseLab />
          </div>
        </div>

        <div className="hero__strengths" data-intro>
          <span className="mono hero__strengths-label">Keyframes</span>
          <div className="hero__track" aria-hidden="true">
            <span className="hero__track-fill" />
          </div>
          <ul aria-label="Core strengths">
            {strengths.map((s) => (
              <li key={s} className="mono">
                <span className="kf" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
