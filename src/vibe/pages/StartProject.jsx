import PageTransition from '../components/PageTransition'
import BriefForm from '../components/BriefForm'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'

export default function StartProject() {
  return (
    <PageTransition>
      {/* Page hero */}
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
            background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.06), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedTextBlock
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
          >
            <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }} />
            <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Start a Project
            </span>
          </AnimatedTextBlock>

          <AnimatedTextBlock
            as="h1"
            delay={0.1}
            dir="rtl"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              textAlign: 'right',
              margin: '0 0 1.5rem 0',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            خلينا نفهم البراند الأول.
          </AnimatedTextBlock>

          <AnimatedTextBlock
            as="p"
            delay={0.25}
            dir="rtl"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: 'var(--t55)',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              lineHeight: 1.95,
              textAlign: 'right',
              margin: '0 0 2rem 0',
              maxWidth: '680px',
              marginLeft: 'auto',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            لو حاسس إن شكل البراند على السوشيال أقل من قيمته، ابدأ من هنا. جاوب على الأسئلة الأساسية، وبعدها نحدد أنسب خطوة.
          </AnimatedTextBlock>

        </div>
      </section>

      {/* Form section */}
      <AnimatedSection style={{ padding: '6rem 4rem 8rem', borderBottom: '1px solid var(--t07)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <BriefForm />
        </div>
      </AnimatedSection>

    </PageTransition>
  )
}
