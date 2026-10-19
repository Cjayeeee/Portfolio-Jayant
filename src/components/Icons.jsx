export const Arrow = ({ className = 'pill__arrow', dir = 'right' }) => {
  const rot = { right: 0, down: 90, up: -90, ne: -45 }[dir] ?? 0
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
