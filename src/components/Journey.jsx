import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { journey } from '../data/site'
import './Journey.css'

export default function Journey() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.jr__title > *', {
        yPercent: 100,
        stagger: 0.08,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.jr__title', start: 'top 85%' },
      })
      gsap.utils.toArray('.jr__item').forEach((el) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
        gsap.from(el.querySelector('.jr__rule'), {
          scaleX: 0,
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="journey" ref={root} className="jr" aria-labelledby="jr-title">
      <div className="wrap">
        <div className="section-head mono">
          <span>(06) Journey</span>
          <span className="section-head__rule" />
          <span className="section-head__code">00:01:36</span>
        </div>

        <div className="jr__grid">
          <h2 id="jr-title" className="jr__title">
            <span className="display">Journey</span>
            <span className="serif-i">so far</span>
          </h2>

          <ol className="jr__list">
            {journey.map((j, i) => (
              <li key={i} className="jr__item">
                <span className="jr__rule" aria-hidden="true" />
                <span className="mono jr__when">
                  <span className={`kf ${i === 0 ? '' : 'kf--hollow'}`} aria-hidden="true" /> {j.when}
                </span>
                <div className="jr__what">
                  <h3 className="jr__role">{j.title}</h3>
                  {j.place && <p className="jr__place">{j.place}</p>}
                </div>
                <p className="jr__detail">{j.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
