import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import './Cursor.css'

/**
 * Custom cursor: a keyframe-diamond that tracks the pointer instantly,
 * and a ring that trails behind with easing and stretches with velocity.
 * - Links and buttons: the ring grows.
 * - Elements with data-cursor="Label": the ring fills and shows the label.
 * - Elements with data-cursor-quiet: the ring hides, only the dot remains.
 * Only on devices with a precise pointer that can hover; touch keeps the native behaviour.
 */
const INTERACTIVE = 'a, button, [role="button"], label, summary, input, select, textarea'

export default function Cursor() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduced = prefersReducedMotion()
    const html = document.documentElement
    html.classList.add('has-custom-cursor')

    const dot = el.querySelector('.cursor__dot')
    const ring = el.querySelector('.cursor__ring')
    const shape = el.querySelector('.cursor__shape')
    const label = el.querySelector('.cursor__label')

    const dotX = gsap.quickTo(dot, 'x', { duration: reduced ? 0 : 0.08, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: reduced ? 0 : 0.08, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: reduced ? 0 : 0.5, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: reduced ? 0 : 0.5, ease: 'power3' })

    const over = (e) => {
      // quiet zones (e.g. the work list, which has its own image preview): keep only the dot
      if (e.target.closest?.('[data-cursor-quiet]')) {
        el.classList.add('is-quiet')
        el.classList.remove('is-hover', 'is-label')
        return
      }
      el.classList.remove('is-quiet')
      const labelled = e.target.closest?.('[data-cursor]')
      const interactive = e.target.closest?.(INTERACTIVE)
      if (labelled) {
        label.textContent = labelled.dataset.cursor
        el.classList.add('is-label')
        el.classList.remove('is-hover')
      } else if (interactive) {
        el.classList.add('is-hover')
        el.classList.remove('is-label')
      } else {
        el.classList.remove('is-hover', 'is-label')
      }
    }

    let shown = false
    let lastTarget = null
    let px = -1
    let py = -1
    const move = (e) => {
      px = e.clientX
      py = e.clientY
      // re-check the hover state whenever the element under the pointer changes,
      // so the cursor never gets stuck in a stale state (e.g. after scrolling or a hot reload)
      if (e.target !== lastTarget) {
        lastTarget = e.target
        over(e)
      }
      if (!shown) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY })
        el.classList.remove('is-hidden')
        shown = true
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    // content scrolls under a still pointer: re-check what is beneath it
    let scrollRaf = 0
    const onScroll = () => {
      if (scrollRaf || px < 0) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0
        const target = document.elementFromPoint(px, py)
        if (target && target !== lastTarget) {
          lastTarget = target
          over({ target })
        }
      })
    }

    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    const leave = () => {
      el.classList.add('is-hidden')
      shown = false
    }

    // velocity stretch: squash the ring along its direction of travel
    let lastX = 0
    let lastY = 0
    const stretch = () => {
      const x = gsap.getProperty(ring, 'x')
      const y = gsap.getProperty(ring, 'y')
      const dx = x - lastX
      const dy = y - lastY
      lastX = x
      lastY = y
      const speed = Math.min(Math.hypot(dx, dy), 40)
      const s = speed / 40
      gsap.set(shape, {
        rotate: (Math.atan2(dy, dx) * 180) / Math.PI,
        scaleX: 1 + s * 0.45,
        scaleY: 1 - s * 0.25,
      })
    }
    if (!reduced) gsap.ticker.add(stretch)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', leave)

    return () => {
      html.classList.remove('has-custom-cursor')
      gsap.ticker.remove(stretch)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(scrollRaf)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={root} className="cursor is-hidden" aria-hidden="true">
      <div className="cursor__ring">
        <span className="cursor__shape" />
        <span className="cursor__label" />
      </div>
      <div className="cursor__dot" />
    </div>
  )
}
