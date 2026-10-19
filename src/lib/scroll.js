import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis = null

export function initSmoothScroll() {
  if (prefersReducedMotion()) return null
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis && lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export const getLenis = () => lenis

/** Scroll to a section id (or 0 for top). Falls back to native scrolling. */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.getElementById(target) : null
  if (lenis) {
    lenis.scrollTo(el ?? 0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
  } else if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    window.scrollTo({ top: 0 })
  }
  if (el) {
    // move keyboard focus to the section for accessibility
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
