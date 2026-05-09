import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedTextBlock from './motion/AnimatedTextBlock'

const statements = [
  {
    arabicFull: 'بوست حلو مش كفاية لو مفيش نظام.',
    arabicStart: 'بوست حلو مش كفاية لو مفيش نـ',
    kashida: 'ــــ',
    arabicEnd: 'ـظام.',
    en: 'A nice post means nothing without a system behind it.',
  },
  {
    arabicFull: 'البراند القوي محتاج ظهور ثابت، متماسك.',
    arabicStart: 'البراند القوي محتاج ظهور ثابت، متماسـ',
    kashida: 'ــــ',
    arabicEnd: 'ـك.',
    en: 'A strong brand needs a consistent, clear, and cohesive presence.',
  },
  {
    arabicFull: 'التصميم يبدأ من الفهم، مش من الشكل.',
    arabicStart: 'التصميم يبدأ من الفهـ',
    kashida: 'ــــ',
    arabicEnd: 'ـم، مش من الشكل.',
    en: 'Design starts from understanding, not from aesthetics.',
  },
]

// Reusable editorial easing
const ease = [0.22, 1, 0.36, 1]

function SectionLabel({ number, label }) {
  return (
    <AnimatedTextBlock
      style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}
    >
      <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        ({number})
      </span>
      <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
      <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </AnimatedTextBlock>
  )
}

function StatementRow({ stmt, index, isMobile }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      dir="rtl"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={isMobile ? undefined : 'hover'}
      style={{
        position: 'relative',
        borderBottom: index < statements.length - 1 ? '1px solid transparent' : 'none',
        padding: isMobile ? '2.5rem 0' : '4rem 0',
        cursor: 'default',
      }}
    >
      {/* Animated divider line */}
      {index < statements.length - 1 && (
        <motion.div
          variants={{
            hidden: { scaleX: 0, originX: 1 },
            visible: { scaleX: 1, originX: 1, transition: { duration: 1.2, ease } },
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'var(--t07)',
          }}
        />
      )}

      {/* Main Arabic Statement */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.2 } },
        }}
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontSize: isMobile ? 'clamp(2rem, 9vw, 3.2rem)' : 'clamp(1.4rem, 3.5vw, 3rem)',
          lineHeight: isMobile ? 1.35 : 1.6,
          color: 'var(--text)',
          textAlign: 'right',
          fontWeight: 400,
          margin: 0,
          maxWidth: '100%',
          wordBreak: 'normal',
          overflowWrap: 'normal',
          letterSpacing: 0,
        }}
      >
        {isMobile ? (
          stmt.arabicFull
        ) : (
          <>
            {stmt.arabicStart}
            <motion.span
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { 
                  width: 0, 
                  opacity: 1,
                  transition: { duration: 0.1 }
                },
                hover: {
                  width: '0.8em', 
                  transition: { duration: 0.6, ease }
                }
              }}
              style={{
                display: 'inline-block',
                clipPath: 'inset(0)',
                whiteSpace: 'nowrap',
                verticalAlign: 'baseline',
                color: 'inherit',
              }}
            >
              {stmt.kashida}
            </motion.span>
            {stmt.arabicEnd}
          </>
        )}
      </motion.p>

      {/* English subtitle */}
      <motion.p
        dir="ltr"
        variants={{
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease, delay: 0.4 } },
          hover: isMobile ? {} : { opacity: 0.7, x: -3, transition: { duration: 0.4, ease } }
        }}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: isMobile ? '0.78rem' : 'clamp(0.78rem, 1vw, 0.88rem)',
          color: 'var(--t28)',
          textAlign: 'right', // align to the right side of the row
          fontWeight: 300,
          marginTop: isMobile ? '1rem' : '1.25rem',
          letterSpacing: '0.05em',
        }}
      >
        {stmt.en}
      </motion.p>
    </motion.div>
  )
}

export default function Manifesto() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      id="manifesto"
      style={{
        padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
        borderBottom: '1px solid var(--t07)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionLabel number="01" label="Philosophy" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {statements.map((stmt, i) => (
            <StatementRow key={i} stmt={stmt} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
