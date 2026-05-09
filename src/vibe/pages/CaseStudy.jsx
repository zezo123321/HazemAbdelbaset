import { useParams, Link } from '@/vibe/router'
import { caseStudies } from '../data/case-studies'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'
import AnimatedCardGrid from '../components/motion/AnimatedCardGrid'
import AnimatedCard from '../components/motion/AnimatedCard'
import MotionButton from '../components/motion/MotionButton'
import EditorialImage from '../components/motion/EditorialImage'

function NotFound() {
  return (
    <div style={{ padding: '12rem 4rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--t40)', fontSize: '0.88rem' }}>Case study not found.</p>
      <Link to="/case-studies" style={{ color: 'var(--accent)', fontSize: '0.82rem', textDecoration: 'none', letterSpacing: '0.15em' }}>
        ← Back to work
      </Link>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = caseStudies.find((p) => p.slug === slug)

  if (!project) return <NotFound />

  return (
    <PageTransition>
      {/* Case study hero */}
      <section
        style={{
          padding: 'clamp(7rem, 12vw, 10rem) 4rem clamp(4rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--t07)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${project.color}18, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedTextBlock style={{ marginBottom: '3rem' }}>
            <Link
              to="/case-studies"
              style={{
                color: 'var(--t40)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
            >
              ← Work
            </Link>
          </AnimatedTextBlock>

          {/* Meta row */}
          <AnimatedTextBlock
            delay={0.1}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
          >
            <span style={{ color: project.color, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500 }}>
              {project.category}
            </span>
            <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
            <span style={{ color: 'var(--t28)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>{project.year}</span>
            <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
            <span style={{ color: 'var(--t28)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>{project.scope}</span>
          </AnimatedTextBlock>

          {/* Project name */}
          <AnimatedTextBlock
            as="h1"
            delay={0.15}
            style={{
              color: 'var(--text)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: '0 0 2rem 0',
            }}
          >
            {project.name}
          </AnimatedTextBlock>

          {/* Strategic headline */}
          <AnimatedTextBlock
            as="p"
            delay={0.3}
            style={{
              color: 'var(--t70)',
              fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: '620px',
              margin: '0 0 1.5rem 0',
            }}
          >
            "{project.headline}"
          </AnimatedTextBlock>

          {/* Arabic headline */}
          <AnimatedTextBlock
            as="p"
            delay={0.4}
            dir="rtl"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: 'var(--t40)',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
              lineHeight: 1.85,
              textAlign: 'right',
              maxWidth: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {project.headlineAr}
          </AnimatedTextBlock>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 4rem' }}>
        {/* Hero visual */}
        <AnimatedSection style={{ margin: '5rem 0' }}>
          <EditorialImage 
            src="/images/placeholder-hero.jpg" 
            alt="Project Hero Visual" 
            aspectRatio="16/9" 
          />
        </AnimatedSection>

        {/* Problem */}
        <section style={{ marginBottom: '6rem', paddingBottom: '6rem', borderBottom: '1px solid var(--t07)' }}>
          <SectionHeader number="01" label="The Problem" />
          <AnimatedTextBlock
            as="p"
            style={{
              color: 'var(--text)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: '800px',
            }}
          >
            {project.problem}
          </AnimatedTextBlock>
        </section>

        {/* Approach */}
        <section style={{ marginBottom: '6rem', paddingBottom: '6rem', borderBottom: '1px solid var(--t07)' }}>
          <SectionHeader number="02" label="The Approach" />
          <AnimatedCardGrid 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2px',
              backgroundColor: 'var(--t07)'
            }}
          >
            {project.approach.map((step, i) => (
              <AnimatedCard
                key={step.step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  padding: '3rem',
                  backgroundColor: 'var(--bg)',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    color: 'var(--accent-strong)',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    style={{
                      color: 'var(--text)',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: '0 0 1rem 0',
                    }}
                  >
                    {step.step}
                  </h3>
                  <p
                    style={{
                      color: 'var(--t70)',
                      fontSize: '0.95rem',
                      lineHeight: 1.8,
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </AnimatedCardGrid>
        </section>

        {/* System Overview */}
        <section style={{ marginBottom: '6rem', paddingBottom: '6rem', borderBottom: '1px solid var(--t07)' }}>
          <SectionHeader number="03" label="System Overview" />
          <AnimatedCardGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
             <AnimatedCard>
                <h4 style={{ color: 'var(--text)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 600 }}>Typography</h4>
                <div style={{ padding: '3rem', backgroundColor: 'var(--bg)', border: '1px solid var(--t07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontSize: '4rem', lineHeight: 1, fontFamily: 'serif', color: 'var(--text)' }}>Aa</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--t40)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Primary Typeface</span>
                </div>
             </AnimatedCard>
             <AnimatedCard>
                <h4 style={{ color: 'var(--text)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 600 }}>Color Palette</h4>
                <div style={{ display: 'flex', gap: '1rem', padding: '3rem', backgroundColor: 'var(--bg)', border: '1px solid var(--t07)' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--text)', border: '1px solid var(--t18)' }} />
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--accent)', border: '1px solid var(--t18)' }} />
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--t18)', border: '1px solid var(--t18)' }} />
                </div>
             </AnimatedCard>
          </AnimatedCardGrid>
        </section>

        {/* Visuals */}
        <section style={{ marginBottom: '6rem', paddingBottom: '6rem', borderBottom: '1px solid var(--t07)' }}>
          <SectionHeader number="04" label="Selected Visuals" />
          <AnimatedCardGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <AnimatedCard>
              <EditorialImage src="/images/placeholder-01.jpg" alt="Visual 01" aspectRatio="4/5" />
            </AnimatedCard>
            <AnimatedCard>
              <EditorialImage src="/images/placeholder-02.jpg" alt="Visual 02" aspectRatio="4/5" />
            </AnimatedCard>
          </AnimatedCardGrid>
          <AnimatedTextBlock
            as="p"
            style={{
              color: 'var(--t18)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            Project visuals — replace with actual assets
          </AnimatedTextBlock>
        </section>

        {/* Outcome */}
        <section style={{ marginBottom: '5rem', paddingBottom: '5rem', borderBottom: '1px solid var(--t07)' }}>
          <SectionHeader number="05" label="What Changed" />
          <AnimatedTextBlock
            as="p"
            style={{
              color: 'var(--t70)',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              lineHeight: 1.9,
              fontWeight: 300,
              maxWidth: '680px',
            }}
          >
            {project.outcome}
          </AnimatedTextBlock>
        </section>

        {/* CTA */}
        <AnimatedSection style={{ padding: '4rem 0 8rem', textAlign: 'center' }}>
          <AnimatedTextBlock
            as="p"
            style={{
              color: 'var(--t55)',
              fontSize: '1rem',
              fontWeight: 300,
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}
          >
            Need your brand to show up with more clarity?
          </AnimatedTextBlock>
          <AnimatedTextBlock delay={0.1}>
            <MotionButton
              to="/start-project"
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-bg)')}
            >
              Start a project ↗
            </MotionButton>
          </AnimatedTextBlock>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
