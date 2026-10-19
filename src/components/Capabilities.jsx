import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { capabilities } from '../data/site'
import './Capabilities.css'

const TICKS = Array.from({ length: 11 }, (_, i) => i * 10)

export default function Capabilities() {
  const root = useRef(null)

  useGSAP(
    () => {
      const kfs = gsap.utils.toArray('.dope__kf')
      const readout = root.current.querySelector('.dope__frame')
      const setFrame = (p) => {
        const f = p * 100
        readout.textContent = String(Math.round(f)).padStart(3, '0')
        kfs.forEach((k) => k.classList.toggle('is-hit', Number(k.dataset.at) <= f + 0.5))
      }

      if (prefersReducedMotion()) {
        setFrame(1)
        return
      }

      gsap.from('.cap__title > *', {
        yPercent: 100,
        stagger: 0.08,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.cap__title', start: 'top 85%' },
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 861px)', () => {
        gsap.fromTo(
          '.dope__playhead',
          { left: '0%' },
          {
            left: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.dope',
              start: 'center center',
              end: '+=120%',
              pin: '.cap__pin',
              scrub: 0.6,
              onUpdate: (self) => setFrame(self.progress),
              onLeaveBack: () => setFrame(0),
            },
          },
        )
        setFrame(0)
      })
      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray('.dope__row').forEach((row) => {
          gsap.from(row.querySelectorAll('.dope__kf'), {
            scale: 0.6,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.7,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: row, start: 'top 85%' },
            onStart: () => row.querySelectorAll('.dope__kf').forEach((k) => k.classList.add('is-hit')),
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="capabilities" ref={root} className="cap theme-dark" data-nav-theme="dark" aria-labelledby="cap-title">
      <div className="cap__pin">
        <div className="wrap">
          <div className="section-head mono">
            <span>(05) Capabilities</span>
            <span className="section-head__rule" />
            <span className="section-head__code">00:01:12</span>
          </div>

          <div className="cap__intro">
            <h2 id="cap-title" className="cap__title display">
              <span className="line-mask"><span>The</span></span>{' '}
              <span className="line-mask"><span className="serif-i cap__serif">dope</span></span>{' '}
              <span className="line-mask"><span>sheet</span></span>
            </h2>
            <p className="cap__lede">
              What I reach for, laid out like an animation timeline. Scroll to scrub the playhead. Everything here is
              something I use in real projects.
            </p>
          </div>

          <div className="dope">
            <div className="dope__ruler" aria-hidden="true">
              <span className="mono dope__ruler-label">
                Frame <span className="dope__frame">000</span>
              </span>
              <div className="dope__ticks">
                {TICKS.map((t) => (
                  <span key={t} className="mono" style={{ left: `${t}%` }}>
                    {String(t).padStart(3, '0')}
                  </span>
                ))}
              </div>
            </div>

            <div className="dope__body">
              <ul className="dope__rows">
                {capabilities.map((c) => (
                  <li key={c.group} className="dope__row">
                    <div className="dope__layer">
                      <h3 className="dope__group">{c.group}</h3>
                      <span className="mono dope__note">{c.note}</span>
                    </div>
                    <ul className="dope__track" aria-label={`${c.group} skills`}>
                      {c.items.map((it) => (
                        <li key={it.label} className="dope__kf" data-at={it.at} style={{ '--at': `${it.at}%` }}>
                          <span className="kf" aria-hidden="true" />
                          <span className="dope__kf-label">{it.label}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="dope__playzone" aria-hidden="true">
                <span className="dope__playhead" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
