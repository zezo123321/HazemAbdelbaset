import { useState, useEffect } from 'react'
import { Link, useLocation } from '@/vibe/router'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to

  return (
    <Link
      to={to}
      style={{
        color: active ? 'var(--text)' : 'var(--t40)',
        fontSize: '0.8rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: active ? 500 : 400,
        position: 'relative',
        paddingBottom: '2px',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = active ? 'var(--text)' : 'var(--t40)')}
    >
      {children}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'var(--accent)',
          }}
        />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.5rem 4rem',
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--t07)' : 'none',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left: Brand monogram */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.05em',
            }}
          >
            <span
              style={{
                color: 'var(--text)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                lineHeight: 1,
                transition: 'color 0.2s ease',
              }}
            >
              HA
            </span>
            <span
              style={{
                color: 'var(--accent)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: 0,
              }}
            >
              .
            </span>
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <nav style={{ display: 'none' }} id="desktop-nav">
          {navLinks.filter(link => link.label !== 'Blog').map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}

          {/* Solid CTA */}
          <Link
            to="/start-project"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.55rem 1.4rem',
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background-color 0.25s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Start a Project ↗
          </Link>
        </nav>

        {/* Right: Theme toggle + Hamburger */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.5rem' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '4px',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '28px', height: '1px', backgroundColor: 'var(--text)', display: 'block' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ width: '20px', height: '1px', backgroundColor: 'var(--text)', display: 'block' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '28px', height: '1px', backgroundColor: 'var(--text)', display: 'block' }}
            />
          </button>
        </div>
      </div>

      {/* Overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--nav-mobile-bg)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--t07)',
              padding: '2rem 4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                style={{ borderBottom: '1px solid var(--t07)' }}
              >
                <Link
                  to={link.to}
                  style={{
                    display: 'block',
                    color: 'var(--text)',
                    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    padding: '1.2rem 0',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
              style={{ marginTop: '1.5rem' }}
            >
              <Link
                to="/start-project"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 400,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-strong)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              >
                Start a Project ↗
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          #desktop-nav { display: flex !important; align-items: center; justify-content: center; gap: 2.5rem; }
        }
      `}</style>
    </motion.header>
  )
}
