import { Link } from '@/vibe/router'
import PageTransition from '../components/PageTransition'
import ContactCard from '../components/ContactCard'
import ContactForm from '../components/ContactForm'
import { contactLinks } from '../data/contact-links'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'
import AnimatedCardGrid from '../components/motion/AnimatedCardGrid'
import MotionButton from '../components/motion/MotionButton'
import EditorialImage from '../components/motion/EditorialImage'

export default function Contact() {
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
            top: '-20%',
            right: '-5%',
            width: '500px',
            height: '500px',
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
              Contact
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
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              textAlign: 'right',
              margin: '0 0 1.5rem 0',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            خلينا نتكلم.
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
              margin: '2rem 0 0 auto',
              maxWidth: '600px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            لو عندك سؤال، تعاون، أو حابب تبدأ الكلام بشكل أبسط قبل ما تبعت بريف كامل، تقدر تتواصل من هنا.
          </AnimatedTextBlock>
        </div>
      </section>

      {/* Contact options */}
      <section style={{ padding: '5rem 4rem', borderBottom: '1px solid var(--t07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p
            style={{
              color: 'var(--t18)',
              fontSize: '0.62rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            Direct links
          </p>
          <AnimatedCardGrid
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1px',
              backgroundColor: 'var(--grid-gap)',
              alignItems: 'stretch',
            }}
          >
            {contactLinks.map((contact, i) => (
              <div key={contact.id} style={{ backgroundColor: 'var(--bg)', height: '100%' }}>
                <ContactCard contact={contact} index={i} />
              </div>
            ))}
          </AnimatedCardGrid>
        </div>
      </section>

      {/* CTA to Start Project */}
      <AnimatedSection style={{ padding: '5rem 4rem 7rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div
            style={{
              border: '1px solid var(--t07)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <p
              style={{
                color: 'var(--t18)',
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Ready for a full project?
            </p>
            <p
              style={{
                color: 'var(--t55)',
                fontSize: '0.92rem',
                lineHeight: 1.75,
                fontWeight: 300,
                margin: 0,
                maxWidth: '450px',
              }}
            >
              If you already know you need a visual system, campaign visuals, or brand identity work — use the project brief page. It helps us get to clarity faster.
            </p>
            <MotionButton
              to="/start-project"
              style={{
                color: 'var(--accent)',
                transition: 'color 0.2s ease',
                alignSelf: 'flex-start',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-strong)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            >
              Start a Project ↗
            </MotionButton>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  )
}
