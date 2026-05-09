import AnimatedTextBlock from './motion/AnimatedTextBlock'
import AnimatedCardGrid from './motion/AnimatedCardGrid'
import AnimatedCard from './motion/AnimatedCard'
import EditorialImage from './motion/EditorialImage'

const steps = [
  {
    number: '01',
    title: 'Understand',
    arabic: 'فهم البراند، الجمهور، الرسالة، والنبرة',
    description: 'Deep dive into the brand, audience, message, and tone — before any visual decision is made.',
  },
  {
    number: '02',
    title: 'Direction',
    arabic: 'تحديد الاتجاه البصري قبل التصميم',
    description: 'Define the visual direction, mood, and strategy — so every design decision is intentional, not arbitrary.',
  },
  {
    number: '03',
    title: 'System',
    arabic: 'بناء القواعد، القوالب، والـ visual language',
    description: 'Build the rules, templates, and visual language that make the brand consistent and scalable over time.',
  },
  {
    number: '04',
    title: 'Execution',
    arabic: 'تسليم أصول جاهزة للنشر والاستخدام',
    description: 'Deliver production-ready assets — organized, documented, and ready for immediate use.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      style={{
        padding: '8rem 4rem',
        borderBottom: '1px solid var(--t07)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="process-grid">
          
          {/* Left Column: Heading (Sticky on Desktop) */}
          <div className="process-sticky">
            <AnimatedTextBlock
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
            >
              <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(02)</span>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
              <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Method</span>
            </AnimatedTextBlock>

            <AnimatedTextBlock
              as="h2"
              delay={0.1}
              style={{
                color: 'var(--text)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                margin: '0 0 2rem 0',
              }}
            >
              My Method
            </AnimatedTextBlock>

            <AnimatedTextBlock
               as="p"
               delay={0.2}
               style={{
                 color: 'var(--t55)',
                 fontSize: '0.95rem',
                 lineHeight: 1.8,
                 fontWeight: 300,
                 maxWidth: '400px'
               }}
            >
               A clear, strategic approach to building visual systems that scale. No arbitrary decisions, just intentional design.
            </AnimatedTextBlock>
          </div>

          {/* Right Column: Stacked Steps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((step, i) => (
              <AnimatedCard
                key={step.number}
                style={{
                  padding: '3rem 0',
                  borderBottom: '1px solid var(--t07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  borderTop: i === 0 ? '1px solid var(--t07)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                   <AnimatedTextBlock
                     as="span"
                     delay={i * 0.1 + 0.2}
                     style={{
                       color: 'var(--accent)',
                       fontFamily: "'Poppins', sans-serif",
                       fontWeight: 500,
                       fontSize: '1rem',
                       lineHeight: 1.5,
                       letterSpacing: '0.1em',
                       flexShrink: 0,
                       paddingTop: '0.1rem'
                     }}
                   >
                     {step.number} —
                   </AnimatedTextBlock>

                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                     <h3
                       style={{
                         color: 'var(--text)',
                         fontFamily: "'Poppins', sans-serif",
                         fontWeight: 600,
                         fontSize: '1.2rem',
                         textTransform: 'uppercase',
                         letterSpacing: '0.1em',
                         margin: 0,
                       }}
                     >
                       {step.title}
                     </h3>

                     <p
                       dir="rtl"
                       style={{
                         fontFamily: "'Cairo', sans-serif",
                         color: 'var(--text)',
                         fontSize: '1.05rem',
                         lineHeight: 1.85,
                         textAlign: 'right',
                         margin: 0,
                         fontWeight: 600,
                         wordBreak: 'break-word',
                         overflowWrap: 'break-word',
                       }}
                     >
                       {step.arabic}
                     </p>

                     <p
                       style={{
                         color: 'var(--t55)',
                         fontSize: '0.9rem',
                         lineHeight: 1.75,
                         fontWeight: 300,
                         margin: 0,
                       }}
                     >
                       {step.description}
                     </p>
                   </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

        </div>
      </div>
      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: start;
        }
        .process-sticky {
          position: relative;
        }
        @media (min-width: 900px) {
          .process-grid {
            grid-template-columns: 350px 1fr;
            gap: 6rem;
          }
          .process-sticky {
            position: sticky;
            top: 8rem;
          }
        }
        @media (max-width: 640px) {
           .process-grid { gap: 3rem; }
        }
      `}</style>
    </section>
  )
}
