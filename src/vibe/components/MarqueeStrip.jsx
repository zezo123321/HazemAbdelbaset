const items = [
  'Social Media Systems',
  'Campaign Visuals',
  'Brand Identity',
  'Visual Direction',
  'Arab Brands',
  'Strategic Design',
  'Content Design',
  'Visual Systems',
  'Brand Presence',
  'Campaign Art Direction',
]

export default function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--t07)',
        borderBottom: '1px solid var(--t07)',
        padding: '1.2rem 0',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="marquee-track" style={{ display: 'flex', gap: '3.5rem', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3.5rem',
              color: 'var(--t28)',
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 400,
              flexShrink: 0,
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)', fontSize: '0.5rem', opacity: 0.8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
