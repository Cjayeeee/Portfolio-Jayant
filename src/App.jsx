import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll, startScroll, stopScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Work from './components/Work'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Cursor from './components/Cursor'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const destroy = initSmoothScroll()
    stopScroll()
    return () => destroy?.()
  }, [])

  useEffect(() => {
    if (!ready) return
    startScroll()
    // fonts/images may shift layout after the preloader; recalc triggers
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [ready])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Preloader onDone={() => setReady(true)} />
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Manifesto />
        <Work />
        <About />
        <Capabilities />
        <Journey />
      </main>
      <Contact />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Analytics />
    </>
  )
}
