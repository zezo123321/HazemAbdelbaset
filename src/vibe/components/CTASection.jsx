import { Link } from '@/vibe/router'
import AnimatedTextBlock from './motion/AnimatedTextBlock'
import AnimatedSection from './motion/AnimatedSection'
import MotionButton from './motion/MotionButton'

export default function CTASection() {
  return (
    <AnimatedSection
      id="contact"
      style={{
        position: 'relative',
        padding: '10rem 4rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, var(--accent), transparent 65%)',
          opacity: 0.045,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <AnimatedTextBlock
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}
        >
          <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(06)</span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
          <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Let's Work</span>
        </AnimatedTextBlock>

        {/* Headlines */}
        <AnimatedTextBlock
          as="h2"
          delay={0.1}
          style={{
            color: 'var(--text)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            textTransform: 'uppercase',
            fontSize: 'clamp(1.2rem, 3.3vw, 2.88rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            margin: '0 0 0.3rem 0',
          }}
        >
          Your brand may not need more posts
        </AnimatedTextBlock>
        <AnimatedTextBlock
          as="h2"
          delay={0.2}
          style={{
            color: 'var(--accent)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: 'clamp(2rem, 5.5vw, 4.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            textAlign: 'center',
            margin: '0 0 0.75rem 0',
          }}
        >
          It may need a system
        </AnimatedTextBlock>

        {/* Arabic */}
        <AnimatedTextBlock
          delay={0.3}
          dir="rtl"
          style={{ marginBottom: '4rem', marginTop: '0.75rem' }}
        >
          <p
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
              lineHeight: 1.6,
              color: 'var(--t40)',
              margin: 0,
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            براندك مش محتاج بوستات أكتر — يمكن محتاج نظام
          </p>
        </AnimatedTextBlock>

        {/* CTAs */}
        <AnimatedTextBlock
          delay={0.4}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <MotionButton
            to="/start-project"
            style={{
              padding: '1.1rem 2.5rem',
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
            }}
          >
            Start a project
            <span style={{ fontSize: '1rem' }}>↗</span>
          </MotionButton>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <MotionButton
              href="https://www.linkedin.com/in/hazem-abdelbaset"
              style={{ color: 'var(--t40)', fontSize: '0.72rem', textDecoration: 'none', transition: 'color 0.2s ease', fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
            >
              LinkedIn
            </MotionButton>
            <span style={{ color: 'var(--t10)', fontSize: '1rem' }}>·</span>
            <MotionButton
              href="https://www.behance.net/hazem-abdelbaset"
              style={{ color: 'var(--t40)', fontSize: '0.72rem', textDecoration: 'none', transition: 'color 0.2s ease', fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
            >
              Behance
            </MotionButton>
            <span style={{ color: 'var(--t10)', fontSize: '1rem' }}>·</span>
            <MotionButton
              href="mailto:hazem.a.abduallh@gmail.com"
              style={{ color: 'var(--t40)', fontSize: '0.72rem', textDecoration: 'none', transition: 'color 0.2s ease', fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
            >
              Email
            </MotionButton>
          </div>
        </AnimatedTextBlock>
      </div>
    </AnimatedSection>
  )
}
