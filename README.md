# Jayant Chaudhari: Portfolio ("Motion Score")

A creative-developer portfolio built with **React + Vite**, **GSAP / ScrollTrigger / SplitText** and **Lenis** smooth scrolling.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Edit your content

Everything you'll want to change lives in **`src/data/site.js`**:

| What | Where |
| --- | --- |
| Name, email, location, availability | `profile` |
| Résumé button | `profile.resumeUrl` → put `resume.pdf` in `/public` and set `'/resume.pdf'` |
| Portrait in About | `profile.portrait` → e.g. `'/portrait.webp'` in `/public` (shown in B&W) |
| Social links | `socials` (entries with `href: null` are hidden) |
| Projects | `projects`: name, tagline, description, role, contribution, stack, year, `live`, `source` |
| Project screenshots | put images in `/public/projects/` and set `image: '/projects/name.webp'` (16:10 works best; project 02 is shown at 4:5) |
| Skills dope-sheet | `capabilities` (`at` = horizontal position 0–100) |
| Experience / education | `journey` |

Anything in `[brackets]` is a placeholder. Links set to `null` are never rendered, so there are no dead buttons.

## Structure

```
src/
  data/site.js          ← all content
  lib/gsap.js           ← GSAP + plugin registration
  lib/scroll.js         ← Lenis setup + scrollTo helper
  components/
    Preloader           ← easing-curve frame counter
    Nav                 ← adaptive light/dark nav, mobile menu
    Hero                ← elastic variable-font name + Ease Lab
    ElasticName         ← per-letter width-axis interaction
    EaseLab             ← draggable cubic-bezier editor
    Manifesto           ← scroll-scrubbed statement + cue cards
    Work / ProjectArt   ← project index with cursor preview + case studies
    About, Capabilities (dope sheet), Journey, Contact
  styles/global.css     ← tokens, type, buttons, grain
```

## Accessibility & motion

- `prefers-reduced-motion` disables smooth scroll, the preloader, scroll scrubbing and the elastic type; all content stays visible.
- Skip link, semantic landmarks, visible focus states, keyboard-operable Ease Lab handles (arrow keys, Shift for larger steps), Esc closes the mobile menu.

Fonts (Archivo variable, Story Script, JetBrains Mono) are self-hosted via Fontsource, with no external requests.
