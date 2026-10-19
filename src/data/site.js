/**
 * All editable portfolio content lives here.
 * Anything wrapped in [BRACKETS] is a placeholder; replace it with real, factual details.
 * Set a URL to `null` to hide that link (nothing fake is ever rendered).
 */

export const profile = {
  name: 'Jayant Chaudhari',
  firstName: 'Jayant',
  lastName: 'Chaudhari',
  role: 'Creative Frontend Developer',
  email: 'jayanttbnc@gmail.com',
  location: 'India',
  timezone: 'Asia/Kolkata',
  // Drop a PDF into /public (e.g. /public/resume.pdf) and set this to '/resume.pdf'
  resumeUrl: null,
  // Optional portrait for the About section, e.g. '/portrait.webp' (shown in black & white)
  portrait: null,
  availability: 'Open to freelance & full-time roles',
}

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jayant-chaudhari-6758a3239/' },
  // Add more when ready. Entries with href: null are not rendered.
  { label: 'GitHub', href: null },
  { label: 'Instagram', href: null },
]

export const strengths = ['React', 'GSAP', 'ScrollTrigger', 'Lenis', 'Three.js', 'Tailwind CSS']

/**
 * Projects
 * - hidden: true keeps an entry in the file but off the page.
 * - image: '/projects/my-shot.webp' (put the file in /public/projects) replaces the generated cover.
 *   16:9 works best for a 'feature' layout, 16:10 for the others.
 * - art: picks a generated cover until a real screenshot is added ('marrow' | 1 | 2 | 3).
 * - video (mp4) / videoWebm / poster: optional looping clip for the case-study cover (muted, plays when in view).
 * - ratio: optional cover aspect ratio, e.g. '21 / 10' (defaults depend on layout).
 * - layout: 'feature' = full-width case study; 'split' = text column beside a sticky image/video; 'split-reverse' = the same, mirrored.
 * - highlights: list of what you built (shown as a numbered list).
 */
export const projects = [
  {
    id: 'marrow',
    index: '01',
    name: 'MARROW',
    subtitle: 'Brands with Backbone',
    tagline: 'A bold, editorial agency website that gives ambitious brands a backbone.',
    description:
      'MARROW is a digital presence for a creative strategy and branding studio, built to showcase its approach to brand identity, digital experiences and creative storytelling. Combining oversized typography, a restrained dark palette, vivid orange accents and tactile editorial layouts, the website turns a studio portfolio into an immersive, scroll-led experience. It is designed for ambitious businesses looking for distinctive branding and a cohesive digital presence.',
    role: 'Design and creative frontend development',
    highlights: [
      'An expressive hero section with oversized typography and a distinctive visual identity.',
      "A long-form scrolling layout that guides visitors through the studio's positioning, services and selected work.",
      'A modular portfolio showcase featuring varied brand identities, packaging and campaign visuals.',
      "Expandable service sections presenting the studio's four core offerings.",
      'A detailed case-study section highlighting the Tidewater Ferries project, with supporting visuals and results.',
      'Editorial project listings, testimonial content and a high-contrast contact section.',
      'Responsive layouts and scroll-based interactions.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Vite', 'GSAP', 'ScrollTrigger'],
    year: '2026',
    live: 'https://marrow-agency.vercel.app/',
    source: null,
    image: '/projects/marrow.webp',
    video: '/projects/marrow.mp4',
    videoWebm: '/projects/marrow.webm',
    poster: '/projects/marrow-poster.webp',
    art: 'marrow',
    layout: 'feature',
  },
  {
    id: 'eclipse',
    index: '02',
    name: 'ECLIPSE',
    subtitle: 'Interactive Data Visualization on Coal',
    tagline:
      "An immersive, scroll-driven data story revealing how coal shaped a nation's energy landscape and the scale of the transition ahead.",
    description:
      "In the Shadow of Coal is an interactive data visualization that explores a country's historical dependence on coal and its evolving energy mix. Through striking editorial design, interactive charts and a solar-eclipse-inspired visual narrative, the project transforms complex energy data into an engaging, accessible story. Users can explore the growth of coal, compare energy sources and understand the long road toward a cleaner energy future.",
    role: 'Designer & developer: data storytelling, visual design, interactive visualization and frontend implementation',
    highlights: [
      'Designed a bold, editorial visual identity using dark charcoal backgrounds, vivid yellow accents, oversized typography and eclipse-inspired illustrations.',
      'Created a scroll-driven narrative that guides users through the history and impact of coal.',
      'Built interactive data visualizations to explore energy trends and compare different energy sources.',
      'Developed a grid-based exploration section for examining energy data across different categories.',
      'Presented key energy statistics through animated visual elements and clear data comparisons.',
      'Designed a responsive, immersive web experience that combines storytelling, data and visual interaction.',
    ],
    stack: ['React', 'GSAP', 'ScrollTrigger', 'Lenis', 'HTML', 'CSS', 'Vercel'],
    year: '2026',
    live: 'https://eclipse-coal-visualization.vercel.app/',
    source: null,
    image: '/projects/eclipse.webp',
    video: '/projects/eclipse.mp4',
    videoWebm: '/projects/eclipse.webm',
    poster: '/projects/eclipse-poster.webp',
    art: 'marrow',
    layout: 'split',
  },
  {
    id: 'keisha',
    index: '03',
    name: 'KEISHA AGRO',
    subtitle: 'Farm-grown dragon fruit',
    tagline:
      'A fresh, modern digital experience connecting farm-grown dragon fruit with the people who value quality, freshness and sustainable agriculture.',
    description:
      "Keisha Agro is a visually driven agricultural website that showcases the journey of dragon fruit from cultivation to harvest and delivery. Designed with bold typography, vibrant fruit imagery and an earthy colour palette, the website highlights the farm's growing process, sustainable practices and commitment to quality. The experience combines storytelling with product discovery to build trust and connect customers directly with fresh produce.",
    role: 'Creative Frontend Developer',
    highlights: [
      'Designed a responsive, editorial-style landing page with a distinctive visual identity.',
      'Created immersive hero sections featuring bold typography, vibrant imagery and animated-style visual elements.',
      'Built product showcase sections highlighting organic dragon fruit and its unique qualities.',
      'Developed a farm-to-table storytelling experience covering cultivation, harvesting and packaging.',
      'Designed dedicated sections to introduce the farm, its growers and its agricultural practices.',
      'Created a customer inquiry section to encourage direct communication and product requests.',
      'Established a cohesive design system using forest green, cream and vibrant pink accents.',
      'Structured the website to deliver an engaging experience across desktop and mobile devices.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Lenis', 'Vercel'],
    year: '2026',
    live: 'https://keisha-agro.vercel.app/',
    source: null,
    image: '/projects/keisha.webp',
    video: '/projects/keisha.mp4',
    videoWebm: '/projects/keisha.webm',
    poster: '/projects/keisha.webp',
    ratio: '21 / 10',
    art: 'keisha',
    layout: 'split-reverse',
  },
  {
    id: 'p02',
    hidden: true,
    index: '02',
    name: '[Project 02 Name]',
    tagline: '[One-line hook for the project]',
    description:
      '[Project 02 description: what it is, who it is for, and the idea that makes it interesting. Two or three sentences.]',
    role: '[Your role]',
    contribution: '[What you built]',
    stack: ['React', 'Three.js', 'GSAP'],
    year: '[Year]',
    live: null,
    source: null,
    image: null,
    art: 2,
  },
  {
    id: 'p03',
    hidden: true,
    index: '03',
    name: '[Project 03 Name]',
    tagline: '[One-line hook for the project]',
    description:
      '[Project 03 description: what it is, who it is for, and the idea that makes it interesting. Two or three sentences.]',
    role: '[Your role]',
    contribution: '[What you built]',
    stack: ['React', 'Tailwind CSS', 'GSAP'],
    year: '[Year]',
    live: null,
    source: null,
    image: null,
    art: 3,
  },
]

/** Capabilities, shown as a timeline "dope sheet". `at` = position on the track (0–100). */
export const capabilities = [
  {
    group: 'Frontend',
    note: 'Semantic, accessible foundations',
    items: [
      { label: 'HTML', at: 6 },
      { label: 'CSS', at: 26 },
      { label: 'JavaScript', at: 50 },
      { label: 'React', at: 76 },
    ],
  },
  {
    group: 'Motion',
    note: 'Timelines, scroll & micro-interaction',
    items: [
      { label: 'GSAP', at: 14 },
      { label: 'ScrollTrigger', at: 42 },
      { label: 'Lenis', at: 70 },
    ],
  },
  {
    group: 'Styling',
    note: 'Systems that scale',
    items: [
      { label: 'Tailwind CSS', at: 32 },
      { label: 'Responsive layout', at: 64 },
    ],
  },
  {
    group: 'Creative dev',
    note: 'Where the browser becomes a canvas',
    items: [
      { label: 'Three.js', at: 22 },
      { label: 'WebGL-inspired visuals', at: 56 },
    ],
  },
  {
    group: 'Tools',
    note: 'The daily kit',
    items: [
      { label: 'Git', at: 10 },
      { label: 'GitHub', at: 34 },
      { label: 'Figma', at: 58 },
      { label: 'Vite', at: 82 },
    ],
  },
]

/** Journey: keep it factual. `place` is optional (left out = not shown). */
export const journey = [
  {
    when: 'Now',
    title: 'Creative Frontend Developer',
    place: 'Freelance',
    detail: 'Building animated, interactive web experiences with React and GSAP.',
  },
  {
    when: 'Feb – Aug 2026',
    title: 'Frontend Developer Intern',
    place: null,
    detail: 'Shipped multiple websites, turning designs into responsive, animated interfaces.',
  },
  {
    when: '2024 – 2026',
    title: 'M.Sc. Computer Science',
    place: null,
    detail: 'Highlight project: a 3D airline website.',
  },
]

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
