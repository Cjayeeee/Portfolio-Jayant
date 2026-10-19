import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data/site'
import './About.css'

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create('.about__lead', { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 105,
        stagger: 0.08,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__lead', start: 'top 80%' },
      })
      gsap.from('.about__col, .about__spec li', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__body', start: 'top 82%' },
      })
      gsap.fromTo(
        '.about__card',
        { rotate: -6, y: 60 },
        { rotate: 3, y: -40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.fromTo(
        '.about__card-curve',
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.about__card', start: 'top 85%', end: 'bottom 40%', scrub: true } },
      )
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} className="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="section-head mono">
          <span>(04) About</span>
          <span className="section-head__rule" />
          <span className="section-head__code">00:00:48</span>
        </div>

        <div className="about__grid">
          <figure className="about__card theme-dark">
            {profile.portrait ? (
              <img src={profile.portrait} alt={`Portrait of ${profile.name}`} loading="lazy" />
            ) : (
              <svg viewBox="0 0 300 400" role="img" aria-label="Monogram J C">
                <text x="18" y="300" className="about__card-j">J</text>
                <path className="about__card-curve" d="M20 360 C 170 360, 130 60, 285 50" pathLength="400" strokeDasharray="400" />
                <circle cx="285" cy="50" r="7" fill="#8E95FF" />
              </svg>
            )}
            <figcaption className="mono about__card-cap">
              <span>J.C.</span>
              <span>Frame 048</span>
            </figcaption>
          </figure>

          <div className="about__content">
            <h2 id="about-title" className="sr-only">About Jayant</h2>
            <p className="about__lead">
              I&rsquo;m Jayant, a frontend developer who lives between the design file and the browser. I care
              about <em className="serif-i">how things feel</em> as much as how they work.
            </p>

            <div className="about__body">
              <div className="about__col">
                <h3 className="mono">What I do</h3>
                <p>
                  I turn layouts into living interfaces: scroll-driven narratives, page transitions, interactive type
                  and the small responses that make a site feel considered. React for structure, GSAP for time.
                </p>
              </div>
              <div className="about__col">
                <h3 className="mono">How I work</h3>
                <p>
                  Prototype the motion early, test it on real devices, then trim until only the purposeful parts
                  remain. Accessible markup, reduced-motion fallbacks and smooth frame rates are part of the brief.
                </p>
              </div>

              <ul className="about__spec">
                <li>
                  <span className="mono">Based in</span>
                  <span>{profile.location}</span>
                </li>
                <li>
                  <span className="mono">Focus</span>
                  <span>Creative frontend &amp; motion</span>
                </li>
                <li>
                  <span className="mono">Status</span>
                  <span>{profile.availability}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
