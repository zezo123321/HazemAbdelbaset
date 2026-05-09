import AnimatedTextBlock from './motion/AnimatedTextBlock'
import AnimatedCardGrid from './motion/AnimatedCardGrid'
import AnimatedCard from './motion/AnimatedCard'
import EditorialImage from './motion/EditorialImage'

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
          <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(05)</span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
          <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>About</span>
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
            <EditorialImage 
              src="/images/hazem-portrait-01.jpg" 
              alt="Hazem Abdelbaset Portrait"
              aspectRatio="3/4"
            />
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
              Hazem<br />Abdelbaset
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
                  {['Social Media Systems', 'Campaign Visuals', 'Brand Identity'].map((item) => (
                    <li key={item} style={{ color: 'var(--t70)', fontSize: '0.88rem', fontWeight: 300 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedCard>

          {/* Right: bio text */}
          <AnimatedCard
            style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <p
              style={{
                color: 'var(--t85)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                lineHeight: 1.85,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Hazem Abdelbaset is a Brand-Led Visual Designer focused on helping Arab brands appear as strong as they actually are.
            </p>
            <p
              style={{
                color: 'var(--t55)',
                fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
                lineHeight: 1.85,
                fontWeight: 300,
                margin: 0,
              }}
            >
              His work connects brand understanding with social media systems, campaign visuals, and visual identity foundations — building the kind of presence that is consistent, intentional, and impossible to ignore.
            </p>
            <p
              style={{
                color: 'var(--t55)',
                fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
                lineHeight: 1.85,
                fontWeight: 300,
                margin: 0,
              }}
            >
              The approach is always the same: understand the brand first, define the direction, build the system, then execute. Design that starts from strategy, not from aesthetics.
            </p>
          </AnimatedCard>
        </AnimatedCardGrid>
      </div>
    </section>
  )
}
