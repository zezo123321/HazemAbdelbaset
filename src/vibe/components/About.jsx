import AnimatedTextBlock from './motion/AnimatedTextBlock'
import AnimatedCardGrid from './motion/AnimatedCardGrid'
import AnimatedCard from './motion/AnimatedCard'

const focusedOn = [
  'Social Media Systems',
  'Campaign Visuals',
  'Brand Presence Direction',
  'Visual Identity Refinement',
]

const paragraphs = [
  'Hazem Abdelbaset is a Brand-Led Visual Designer helping Arab brands turn scattered visual communication into clear, consistent, and recognizable visual systems.',
  "He connects brand understanding with social media systems, campaign visuals, and visual direction — creating a presence that reflects the brand's real value.",
  'The process starts with clarity: understand the brand, define the direction, build the system, then execute with intention.',
  'Not random posts. A visual system that makes the brand feel intentional, consistent, and recognizable every time it shows up.',
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '8rem 4rem',
        borderBottom: '1px solid var(--t07)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatedTextBlock
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}
        >
          <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(01)</span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
          <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Designer Behind The System</span>
        </AnimatedTextBlock>

        <AnimatedCardGrid
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Portrait */}
          <AnimatedCard>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <img
                src="/assets/hazem_abdelbaset_about_section.jpg"
                alt="Hazem Abdelbaset"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
            </div>
          </AnimatedCard>

          {/* Column 2: name + details */}
          <AnimatedCard>
            <h2
              style={{
                color: 'var(--text)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                margin: '0 0 0.75rem 0',
              }}
            >
              HAZEM<br />ABDELBASSET
            </h2>
            <p
              style={{
                color: 'var(--accent)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 500,
                margin: '0 0 3rem 0',
              }}
            >
              Brand-Led Visual Designer
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <p style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Based in
                </p>
                <p style={{ color: 'var(--t70)', fontSize: '0.88rem', fontWeight: 300 }}>
                  Arab World
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  Focused on
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {focusedOn.map((item) => (
                    <li key={item} style={{ color: 'var(--t70)', fontSize: '0.88rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedCard>

          {/* Column 3: bio text */}
          <AnimatedCard
            style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {paragraphs.map((text, i) => (
              <p
                key={i}
                style={{
                  color: i === 0 ? 'var(--t85)' : 'var(--t55)',
                  fontSize: i === 0
                    ? 'clamp(0.95rem, 1.4vw, 1.15rem)'
                    : 'clamp(0.88rem, 1.2vw, 1.05rem)',
                  lineHeight: 1.85,
                  fontWeight: i === 0 ? 400 : 300,
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </AnimatedCard>
        </AnimatedCardGrid>
      </div>
    </section>
  )
}
