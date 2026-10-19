import { useRef, useState } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { scrollToTarget } from '../lib/scroll'
import { profile, socials } from '../data/site'
import useClock from './useClock'
import { Arrow } from './Icons'
import './Contact.css'

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const time = useClock(profile.timezone)
  const links = socials.filter((s) => s.href)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create('.ct__headline', { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 105,
        stagger: 0.09,
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.ct__headline', start: 'top 80%' },
      })
      gsap.from('.ct__reveal', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.ct__mail', start: 'top 90%' },
      })
      // the closing wordmark breathes from condensed to expanded as you arrive
      gsap.fromTo(
        '.ct__wordmark text',
        { fontVariationSettings: "'wdth' 62, 'wght' 300" },
        {
          fontVariationSettings: "'wdth' 125, 'wght' 900",
          ease: 'none',
          scrollTrigger: { trigger: '.ct__wordmark', start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )
      gsap.fromTo(
        '.ct__curve',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } },
      )
    },
    { scope: root },
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  }

  return (
    <footer id="contact" ref={root} className="ct theme-dark" data-nav-theme="dark" aria-labelledby="ct-title">
      <svg className="ct__bg" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path className="ct__curve" pathLength="1" d="M -20 120 C 700 120, 740 860, 1460 860" />
        <path className="ct__curve ct__curve--2" pathLength="1" d="M -20 60 C 820 60, 620 900, 1460 900" />
      </svg>

      <div className="wrap ct__inner">
        <div className="section-head mono">
          <span>(07) Contact</span>
          <span className="section-head__rule" />
          <span className="section-head__code">00:02:00 / End</span>
        </div>

        <h2 id="ct-title" className="ct__headline display">
          Got an idea that <em className="serif-i">needs</em> to move?
        </h2>

        <div className="ct__row">
          <p className="ct__invite ct__reveal">
            I&rsquo;m open to freelance projects, full-time roles and creative collaborations, especially the ones
            where motion and detail matter. Tell me what you&rsquo;re building.
          </p>

          <div className="ct__mail">
            <a className="ct__email ct__reveal" href={`mailto:${profile.email}`} data-cursor="Write">
              <span className="mono ct__email-label">Write to me</span>
              <span className="ct__email-addr">{profile.email}</span>
            </a>
            <div className="ct__actions ct__reveal">
              <a className="pill pill--solid" href={`mailto:${profile.email}?subject=Let%E2%80%99s%20work%20together`}>
                Start a project <Arrow />
              </a>
              <button type="button" className="pill" onClick={copy}>
                {copied ? 'Copied to clipboard' : 'Copy email'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </div>
          </div>
        </div>

        <div className="ct__meta">
          <ul className="ct__socials ct__reveal" aria-label="Social links">
            {links.map((s) => (
              <li key={s.label}>
                <a className="u-link" href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
            <li>
              <a className="u-link" href={`mailto:${profile.email}`}>Email</a>
            </li>
            {profile.resumeUrl && (
              <li>
                <a className="u-link" href={profile.resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
              </li>
            )}
          </ul>
          <span className="mono ct__reveal">
            {profile.location} · local time {time}
          </span>
        </div>
      </div>

      <svg className="ct__wordmark" viewBox="0 0 1000 200" aria-hidden="true">
        <text x="0" y="178" textLength="1000" lengthAdjust="spacingAndGlyphs">
          JAYANT
        </text>
      </svg>

      <div className="wrap ct__bottom mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="ct__built">Designed &amp; built with React, GSAP &amp; Lenis</span>
        <a
          href="#top"
          className="u-link ct__top"
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget('top')
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
