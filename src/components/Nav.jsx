import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { scrollToTarget, stopScroll, startScroll } from '../lib/scroll'
import { nav, profile, socials } from '../data/site'
import useClock from './useClock'
import './Nav.css'

export default function Nav({ ready }) {
  const root = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const [dark, setDark] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const time = useClock(profile.timezone)

  // theme follows the section underneath; hide on scroll down
  useGSAP(
    () => {
      const sections = gsap.utils.toArray('[data-nav-theme="dark"]')
      sections.forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 36px',
          end: 'bottom 36px',
          onToggle: (self) => setDark(self.isActive),
        }),
      )
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          setHidden(y > 200 && self.direction === 1)
        },
      })
    },
    { dependencies: [ready] },
  )

  // intro
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap.from('.nav__item', { yPercent: -120, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out', delay: 0.35 })
    },
    { scope: root, dependencies: [ready] },
  )

  // mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    if (open) {
      stopScroll()
      document.body.style.overflow = 'hidden'
      if (!prefersReducedMotion()) {
        gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
        gsap.fromTo(menu.querySelectorAll('.menu__link'), { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out', delay: 0.3 })
      }
      menu.querySelector('a')?.focus()
      const onKey = (e) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
      startScroll()
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    if (wasOpen) toggleRef.current?.focus()
    // allow the menu to unlock scrolling first
    requestAnimationFrame(() => scrollToTarget(id))
  }

  const cls = ['nav', dark && !open ? 'nav--dark' : '', hidden && !open ? 'nav--hidden' : '', open ? 'nav--open' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={root} className={cls}>
      <div className="nav__bar wrap">
        <a href="#top" className="nav__brand nav__item" onClick={(e) => go(e, 'top')} aria-label="Jayant Chaudhari, back to top">
          <span className="nav__mono" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M3 20 C 12 20, 12 4, 21 4" /></svg>
          </span>
          <span className="nav__name">
            Jayant <em>Chaudhari</em>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {nav.map((n, i) => (
              <li key={n.id} className="nav__item">
                <a href={`#${n.id}`} className="u-link" onClick={(e) => go(e, n.id)}>
                  {n.label}
                  <sup className="nav__num">0{i + 3}</sup>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__meta nav__item">
          <span className="mono nav__time">
            <span className="nav__live" aria-hidden="true" /> IN {time}
          </span>
          <button
            ref={toggleRef}
            className="nav__toggle mono"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="menu theme-dark" hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="menu__list">
            {nav.map((n, i) => (
              <li key={n.id} className="line-mask">
                <a href={`#${n.id}`} className="menu__link" onClick={(e) => go(e, n.id)}>
                  <span className="mono">0{i + 3}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <a className="mono u-link" href={`mailto:${profile.email}`}>{profile.email}</a>
          {socials
            .filter((s) => s.href)
            .map((s) => (
              <a key={s.label} className="mono u-link" href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
        </div>
      </div>
    </header>
  )
}
