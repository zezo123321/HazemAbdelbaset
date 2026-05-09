import AnimatedTextBlock from './motion/AnimatedTextBlock'
import AnimatedCardGrid from './motion/AnimatedCardGrid'
import AnimatedCard from './motion/AnimatedCard'

const services = [
  {
    number: '01',
    title: 'Social Media Systems',
    description:
      'A complete visual system for brands that want consistent, premium social media presence — not just nice posts.',
    deliverables: [
      'Brand visual guidelines for social',
      'Template system (Posts, Stories, Reels)',
      'Color, type, and layout rules',
      'Ready-to-use asset library',
    ],
  },
  {
    number: '02',
    title: 'Campaign Visuals',
    description:
      'Visual direction and rollout assets for launches, seasons, offers, and campaigns. From concept to final export.',
    deliverables: [
      'Art direction and visual concept',
      'Campaign visual identity',
      'Multi-format rollout assets',
      'Digital and print deliverables',
    ],
  },
  {
    number: '03',
    title: 'Brand Identity / Refresh',
    description:
      'Focused identity systems and brand refreshes for projects that need sharper, more intentional visual foundations.',
    deliverables: [
      'Logo system and lockups',
      'Color and typography system',
      'Visual language definition',
      'Brand guidelines document',
    ],
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: '8rem 4rem',
        borderBottom: '1px solid var(--t07)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatedTextBlock
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}
        >
          <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(03)</span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
          <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Expertise</span>
        </AnimatedTextBlock>

        <AnimatedTextBlock as="h2" delay={0.1}
          style={{
            color: 'var(--text)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: '0 0 5rem 0',
          }}
        >
          What I Build
        </AnimatedTextBlock>

        <AnimatedCardGrid
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--grid-gap)',
          }}
        >
          {services.map((service, i) => (
            <AnimatedCard
              key={service.number}
              className="service-card"
              style={{
                backgroundColor: 'var(--bg)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.4s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg)' }}
            >
              {/* Top accent line */}
              <div
                className="service-accent-line"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'var(--accent)',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.5s ease',
                }}
              />

              <span
                style={{
                  color: 'var(--accent)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {service.number}
              </span>

              <h3
                style={{
                  color: 'var(--text)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: 'var(--t55)',
                  fontSize: '0.88rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {service.description}
              </p>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--t07)' }} />

              <div>
                <p
                  style={{
                    color: 'var(--t28)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  You receive
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {service.deliverables.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        color: 'var(--t55)',
                        fontSize: '0.82rem',
                        fontWeight: 300,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: 'var(--accent-muted)', flexShrink: 0, marginTop: '1px', fontSize: '0.7rem' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedCardGrid>
      </div>

      <style>{`
        .service-card:hover .service-accent-line {
          transform: scaleX(1) !important;
        }
      `}</style>
    </section>
  )
}
