import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { scrollToTarget } from '../lib/scroll'
import { projects as allProjects } from '../data/site'
import ProjectArt from './ProjectArt'
import { Arrow } from './Icons'
import './Work.css'

const projects = allProjects.filter((p) => !p.hidden)

function Cover({ p }) {
  return p.image ? (
    <img src={p.image} alt={`${p.name}: preview`} loading="lazy" decoding="async" />
  ) : (
    <ProjectArt variant={p.art} label={`${p.name}: cover artwork`} />
  )
}

function Links({ p }) {
  return (
    <div className="case__links">
      {p.live && (
        <a className="pill pill--sm" href={p.live} target="_blank" rel="noreferrer">
          Visit live site <Arrow dir="ne" />
        </a>
      )}
      {p.source && (
        <a className="pill pill--sm" href={p.source} target="_blank" rel="noreferrer">
          Source code <Arrow dir="ne" />
        </a>
      )}
      {!p.live && !p.source && <span className="mono case__nolinks">Live &amp; source links coming soon</span>}
    </div>
  )
}

function Meta({ p }) {
  return (
    <dl className="case__meta">
      <div>
        <dt className="mono">Role</dt>
        <dd>{p.role}</dd>
      </div>
      {p.contribution && (
        <div>
          <dt className="mono">Contribution</dt>
          <dd>{p.contribution}</dd>
        </div>
      )}
      <div>
        <dt className="mono">Stack</dt>
        <dd>
          <ul className="case__stack">
            {p.stack.map((s) => (
              <li key={s} className="mono">{s}</li>
            ))}
          </ul>
        </dd>
      </div>
      {p.year && (
        <div>
          <dt className="mono">Year</dt>
          <dd>{p.year}</dd>
        </div>
      )}
    </dl>
  )
}

/** Muted looping clip that only plays while on screen. Pause control lives in Media. */
function VideoCover({ p, videoRef, userPaused }) {
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [videoRef, userPaused])

  return (
    <video
      ref={videoRef}
      poster={p.poster || p.image}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${p.name}: scroll-through recording of the website`}
    >
      {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
      <source src={p.video} type="video/mp4" />
    </video>
  )
}

function Media({ p, total }) {
  const videoRef = useRef(null)
  const userPaused = useRef(false)
  const [paused, setPaused] = useState(false)
  const showVideo = p.video && !prefersReducedMotion()

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
      setPaused(false)
    } else {
      userPaused.current = true
      v.pause()
      setPaused(true)
    }
  }

  return (
    <div className="case__media" style={p.ratio ? { aspectRatio: p.ratio } : undefined}>
      <div className="case__media-inner">
        {showVideo ? (
          <VideoCover p={p} videoRef={videoRef} userPaused={userPaused} />
        ) : p.video ? (
          <img src={p.poster || p.image} alt={`${p.name}: website preview`} loading="lazy" decoding="async" />
        ) : (
          <Cover p={p} />
        )}
      </div>
      <span className="case__badge mono">
        <span className="kf" aria-hidden="true" /> {p.index} / {String(total).padStart(2, '0')}
      </span>
      {showVideo && (
        <button type="button" className="case__play mono" onClick={toggle} aria-pressed={paused}>
          <span className={`case__play-icon ${paused ? 'is-paused' : ''}`} aria-hidden="true" />
          {paused ? 'Play' : 'Pause'}
          <span className="sr-only"> preview video</span>
        </button>
      )}
    </div>
  )
}

function Highlights({ p }) {
  if (!p.highlights?.length) return null
  return (
    <div className="feat__built">
      <h4 className="mono feat__built-title">What I built</h4>
      <ol className="feat__list">
        {p.highlights.map((h, n) => (
          <li key={n}>
            <span className="mono feat__n">{String(n + 1).padStart(2, '0')}</span>
            <span>{h}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CaseStudy({ p, i }) {
  if (p.layout === 'split' || p.layout === 'split-reverse') {
    const rev = p.layout === 'split-reverse'
    return (
      <article id={`case-${p.id}`} className={`case case--split ${rev ? 'case--split-rev' : ''}`} aria-labelledby={`${p.id}-title`}>
        <div className="split__media">
          <Media p={p} total={projects.length} />
        </div>
        <div className="case__info">
          <span className="case__num" aria-hidden="true">{p.index}</span>
          <h3 id={`${p.id}-title`} className="case__title display">
            {p.name}
            {p.subtitle && <span className="case__subtitle serif-i">{p.subtitle}</span>}
          </h3>
          <p className="case__tagline serif-i">{p.tagline}</p>
          <p className="case__desc">{p.description}</p>
          <Links p={p} />
          <Meta p={p} />
          <Highlights p={p} />
        </div>
      </article>
    )
  }

  if (p.layout === 'feature') {
    return (
      <article id={`case-${p.id}`} className="case case--feature" aria-labelledby={`${p.id}-title`}>
        <Media p={p} total={projects.length} />
        <div className="case__info">
          <div className="feat__head">
            <span className="case__num" aria-hidden="true">{p.index}</span>
            <h3 id={`${p.id}-title`} className="case__title display">
              {p.name}
              {p.subtitle && <span className="case__subtitle serif-i">{p.subtitle}</span>}
            </h3>
          </div>
          <div className="feat__body">
            <p className="case__tagline serif-i">{p.tagline}</p>
            <p className="case__desc">{p.description}</p>
            <Links p={p} />
          </div>
          <Meta p={p} />
          <Highlights p={p} />
        </div>
      </article>
    )
  }

  return (
    <article id={`case-${p.id}`} className={`case case--${(i % 3) + 1}`} aria-labelledby={`${p.id}-title`}>
      <Media p={p} total={projects.length} />
      <div className="case__info">
        <span className="case__num" aria-hidden="true">{p.index}</span>
        <h3 id={`${p.id}-title`} className="case__title display">{p.name}</h3>
        <p className="case__tagline serif-i">{p.tagline}</p>
        <p className="case__desc">{p.description}</p>
        <Meta p={p} />
        <Links p={p} />
      </div>
    </article>
  )
}

export default function Work() {
  const root = useRef(null)
  const floatRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.work__title-big', {
        yPercent: 100,
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.work__title', start: 'top 85%' },
      })
      gsap.from('.work__title-serif', {
        y: 30,
        autoAlpha: 0,
        rotate: -4,
        duration: 1.3,
        ease: 'expo.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.work__title', start: 'top 85%' },
      })
      gsap.from('.work__row', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.work__index', start: 'top 85%' },
      })

      gsap.utils.toArray('.case').forEach((el) => {
        const media = el.querySelector('.case__media')
        const inner = el.querySelector('.case__media-inner')
        gsap.fromTo(
          media,
          { clipPath: 'inset(18% 12% 18% 12%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: true },
          },
        )
        const feature = el.classList.contains('case--feature') || el.classList.contains('case--split')
        gsap.fromTo(
          inner,
          { scale: feature ? 1.06 : 1.25, yPercent: feature ? -2 : -6 },
          { scale: 1, yPercent: feature ? 2 : 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        const list = el.querySelector('.feat__list')
        if (list) {
          gsap.from(list.children, {
            y: 24,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: list, start: 'top 85%' },
          })
        }
        gsap.from(el.querySelectorAll('.case__info > *'), {
          y: 36,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el.querySelector('.case__info'), start: 'top 82%' },
        })
      })

      // floating cursor preview for the index (fine pointers only)
      if (window.matchMedia('(pointer: fine)').matches && floatRef.current) {
        const xTo = gsap.quickTo(floatRef.current, 'x', { duration: 0.6, ease: 'power3' })
        const yTo = gsap.quickTo(floatRef.current, 'y', { duration: 0.6, ease: 'power3' })
        const list = root.current.querySelector('.work__index')
        const move = (e) => {
          xTo(e.clientX)
          yTo(e.clientY)
        }
        list.addEventListener('pointermove', move)
        return () => list.removeEventListener('pointermove', move)
      }
    },
    { scope: root },
  )

  const openCase = (e, id) => {
    e.preventDefault()
    scrollToTarget(`case-${id}`)
  }

  return (
    <section id="work" ref={root} className="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-head mono">
          <span>(03) Selected work</span>
          <span className="section-head__rule" />
          <span className="section-head__code">00:00:24</span>
        </div>

        <h2 id="work-title" className="work__title">
          <span className="work__title-serif serif-i">Selected</span>
          <span className="line-mask">
            <span className="work__title-big display">
              Work<sup className="work__count">({String(projects.length).padStart(2, '0')})</sup>
            </span>
          </span>
        </h2>

        <ul className="work__index" onPointerLeave={() => setHovered(null)}>
          {projects.map((p) => (
            <li key={p.id}>
              <a
                href={`#case-${p.id}`}
                className="work__row"
                data-cursor-quiet
                onClick={(e) => openCase(e, p.id)}
                onPointerEnter={() => setHovered(p.id)}
                onFocus={() => setHovered(null)}
              >
                <span className="mono work__row-num">{p.index}</span>
                <span className="work__row-name">{p.name}</span>
                <span className="work__row-tag serif-i">{p.tagline}</span>
                <span className="mono work__row-stack">{p.stack.slice(0, 3).join(' · ')}</span>
                <span className="work__row-go" aria-hidden="true">
                  <Arrow className="work__row-arrow" dir="down" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div ref={floatRef} className={`work__float ${hovered ? 'is-on' : ''}`} aria-hidden="true">
        {projects.map((p) => (
          <div key={p.id} className={`work__float-item ${hovered === p.id ? 'is-active' : ''}`}>
            <Cover p={p} />
          </div>
        ))}
      </div>

      <div className="wrap work__cases">
        {projects.map((p, i) => (
          <CaseStudy key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
