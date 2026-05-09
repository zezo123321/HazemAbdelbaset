import AnimatedTextBlock from './motion/AnimatedTextBlock'

export default function PageHero({ label, title, titleAccent, titleAr, subtitle, subtitleAr, align = 'left' }) {
  const isCenter = align === 'center'

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(7rem, 12vw, 10rem) 4rem clamp(4rem, 6vw, 6rem)',
        borderBottom: '1px solid var(--t07)',
        overflow: 'hidden',
        textAlign: isCenter ? 'center' : 'left',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent), transparent 60%)',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {label && (
          <AnimatedTextBlock
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
              justifyContent: isCenter ? 'center' : 'flex-start',
            }}
          >
            <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }} />
            <span
              style={{
                color: 'var(--t28)',
                fontSize: '0.68rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {label}
            </span>
          </AnimatedTextBlock>
        )}

        <div style={{ overflow: 'hidden', marginBottom: titleAr ? '1.5rem' : '2rem' }}>
          <AnimatedTextBlock
            as="h1"
            delay={0.1}
            style={{
              color: 'var(--text)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            {title}
            {titleAccent && (
              <>
                {' '}
                <span style={{ color: 'var(--accent)' }}>{titleAccent}</span>
              </>
            )}
          </AnimatedTextBlock>
        </div>

        {titleAr && (
          <AnimatedTextBlock
            delay={0.25}
            dir="rtl"
            style={{ marginBottom: subtitle ? '1.5rem' : '0', textAlign: isCenter ? 'center' : 'right' }}
          >
            <p
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                lineHeight: 1.9,
                color: 'var(--t55)',
                margin: 0,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {titleAr}
            </p>
          </AnimatedTextBlock>
        )}

        {subtitle && (
          <AnimatedTextBlock
            as="p"
            delay={0.35}
            style={{
              color: 'var(--t40)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: isCenter ? '600px' : '520px',
              margin: isCenter ? '1.5rem auto 0' : '1.5rem 0 0',
            }}
          >
            {subtitle}
          </AnimatedTextBlock>
        )}
      </div>
    </section>
  )
}
