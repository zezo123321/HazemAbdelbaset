import { Link } from '@/vibe/router'
import { caseStudies } from '../data/case-studies'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import CaseStudyCard from '../components/CaseStudyCard'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'
import AnimatedCardGrid from '../components/motion/AnimatedCardGrid'
import MotionButton from '../components/motion/MotionButton'

export default function Work() {
  return (
    <PageTransition>
      <PageHero
        label="Case Studies"
        title="Selected work,"
        titleAccent="built around clarity."
        titleAr="مش مجرد شغل شكله حلو. دي مشاريع مبنية على فهم، اتجاه، ونظام."
        subtitle="Each project starts with a brand problem, not an aesthetic brief. The work is proof of the thinking."
      />

      <section style={{ padding: '0 4rem 8rem', borderBottom: '1px solid var(--t07)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedCardGrid>
            {caseStudies.map((project, i) => (
              <CaseStudyCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatedCardGrid>
        </div>
      </section>

      <AnimatedSection
        style={{
          padding: '6rem 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, var(--accent), transparent 65%)',
            opacity: 0.04,
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedTextBlock
            as="h2"
            style={{
              color: 'var(--t55)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              textTransform: 'uppercase',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.5rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              margin: '0 0 0.3rem 0',
            }}
          >
            Your brand may not need more posts.
          </AnimatedTextBlock>
          <AnimatedTextBlock
            as="p"
            delay={0.1}
            style={{
              color: 'var(--accent)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: '0 0 2.5rem 0',
            }}
          >
            It may need a system.
          </AnimatedTextBlock>
          <AnimatedTextBlock delay={0.2}>
            <MotionButton
              to="/start-project"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-bg)')}
            >
              Start a project ↗
            </MotionButton>
          </AnimatedTextBlock>
        </div>
      </AnimatedSection>
    </PageTransition>
  )
}
