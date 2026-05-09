import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/vibe/router'
import { ease as editorialEasing } from '../utils/motion'
import EditorialImage from './motion/EditorialImage'

// Left column: name slides up from below overflow-hidden container
const leftContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const nameReveal = {
  hidden: { y: '115%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease: editorialEasing } },
}

const roleReveal = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: editorialEasing } },
}

// Right column: delayed so name reads first, then content fills
const rightContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.55 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: editorialEasing } },
}

const safeChild = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

const safeContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

export default function Hero({ preloaderDone }) {
  const prefersReducedMotion = useReducedMotion()
  const a = preloaderDone ? 'visible' : 'hidden'

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 4rem',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Hero Visual */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'luminosity'
        }}
      >
        <EditorialImage 
          src="/images/hazem-hero.jpg" 
          alt="Abstract Background" 
          aspectRatio="auto"
          style={{ height: '100%' }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(var(--text-rgb), 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--text-rgb), 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top-right glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-8%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle at 70% 30%, var(--accent), transparent 55%)',
          opacity: 0.045,
          pointerEvents: 'none',
        }}
      />

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={preloaderDone ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: editorialEasing }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          color: 'var(--t40)',
          fontSize: '0.7rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          fontWeight: 400,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span
          className="dot-pulse"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            display: 'block',
            flexShrink: 0,
          }}
        />
        Available for new projects
      </motion.div>

      {/* ── Main hero grid: left = name, right = statement + CTA ── */}
      <div
        id="hero-grid"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '3rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* LEFT: large name + role line */}
        <motion.div
          variants={prefersReducedMotion ? safeContainer : leftContainer}
          initial="hidden"
          animate={a}
        >
          <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
            <motion.h1
              variants={prefersReducedMotion ? safeChild : nameReveal}
              className="hero-name"
              style={{
                color: 'var(--text)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                margin: 0,
              }}
            >
              Hazem
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <motion.h1
              variants={prefersReducedMotion ? safeChild : nameReveal}
              className="hero-name"
              style={{
                color: 'var(--text)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                margin: 0,
              }}
            >
              Abdelbaset
            </motion.h1>
          </div>

          {/* Role line */}
          <motion.div
            variants={prefersReducedMotion ? safeChild : roleReveal}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <div
              style={{
                width: '36px',
                height: '1px',
                backgroundColor: 'var(--accent)',
                flexShrink: 0,
              }}
            />
            <p
              style={{
                color: 'var(--t55)',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.92rem)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 400,
                margin: 0,
              }}
            >
              Brand-Led Visual Designer
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT: Arabic statement + English descriptor + CTAs */}
        <motion.div
          id="hero-right"
          variants={prefersReducedMotion ? safeContainer : rightContainer}
          initial="hidden"
          animate={a}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Arabic positioning statement */}
          <motion.div
            variants={prefersReducedMotion ? safeChild : fadeUp}
            dir="rtl"
          >
            <p
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                lineHeight: 1.8,
                color: 'var(--text)',
                textAlign: 'right',
                fontWeight: 600,
                margin: 0,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                letterSpacing: '-0.01em',
              }}
            >
              أنا لا أصمم بوستات.
              <br />
              أبني أنظمة بصرية تخلي البراند يبان أوضح،
              <br />
              أقوى، وأكثر اتساقًا.
            </p>
          </motion.div>

          {/* English supporting line */}
          <motion.p
            variants={prefersReducedMotion ? safeChild : fadeUp}
            style={{
              color: 'var(--t55)',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              lineHeight: 1.9,
              fontWeight: 300,
              margin: '0 0 1rem 0',
              borderLeft: '1px solid var(--t18)',
              paddingLeft: '1.25rem',
              maxWidth: '480px',
            }}
          >
            Social media systems, campaign visuals, and selected brand identity
            work for ambitious brands in the Arab world.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={prefersReducedMotion ? safeChild : fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.875rem' }}
          >
            <Link
              to="/start-project"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 2rem',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease, transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Start a project <span style={{ fontSize: '1rem' }}>↗</span>
            </Link>
            <Link
              to="/case-studies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 2rem',
                border: '1px solid var(--t18)',
                color: 'var(--t55)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--t18)'
                e.currentTarget.style.color = 'var(--t55)'
              }}
            >
              Case Studies
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={preloaderDone ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--t28)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, var(--t28), transparent)',
          }}
        />
        Scroll
      </motion.div>

      {/* Year badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '4rem',
          right: '4rem',
          color: 'var(--t10)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        © 2025
      </div>

      <style>{`
        .hero-name { font-size: clamp(3rem, 12vw, 9rem); }

        .dot-pulse { animation: heroDotPulse 2.2s ease-in-out infinite; }
        @keyframes heroDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.75); }
        }

        @media (min-width: 900px) {
          #hero-grid {
            grid-template-columns: 56fr 44fr !important;
            gap: 5rem !important;
          }
          .hero-name { font-size: clamp(3rem, 6.8vw, 7rem) !important; }
          #hero-right { padding-top: 1.5rem; }
        }

        @media (max-width: 640px) {
          #hero { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dot-pulse { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}
