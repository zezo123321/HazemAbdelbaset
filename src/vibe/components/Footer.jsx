import { Link } from '@/vibe/router'
import AnimatedSection from './motion/AnimatedSection'
import AnimatedCardGrid from './motion/AnimatedCardGrid'
import AnimatedCard from './motion/AnimatedCard'
import AnimatedTextBlock from './motion/AnimatedTextBlock'

const internalLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'Start a Project', to: '/start-project' },
  { label: 'Contact', to: '/contact' },
]

const externalLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hazem-abdelbaset' },
  { label: 'Behance', href: 'https://behance.net/hazem-abdelbaset' },
  { label: 'Email', href: 'mailto:hello@hazemabdelbaset.com' },
]

export default function Footer() {
  const linkStyle = {
    color: 'var(--t40)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontWeight: 400,
    display: 'block',
    marginBottom: '0.65rem',
  }

  return (
    <AnimatedSection
      as="footer"
      style={{
        padding: '4rem 4rem 2.5rem',
        borderTop: '1px solid var(--t07)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatedCardGrid
          speed="slow"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand */}
          <AnimatedCard>
            <p style={{ color: 'var(--text)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.4rem 0' }}>
              Hazem Abdelbaset
            </p>
            <p style={{ color: 'var(--t28)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 1.5rem 0', fontWeight: 300 }}>
              Brand-Led Visual Designer
            </p>
            <p style={{ color: 'var(--t18)', fontSize: '0.7rem', lineHeight: 1.7, fontWeight: 300, maxWidth: '200px' }}>
              Helping ambitious brands in the Arab world build stronger visual presence.
            </p>
          </AnimatedCard>

          {/* Navigation */}
          <AnimatedCard>
            <p style={{ color: 'var(--t28)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 1.25rem 0', fontWeight: 500 }}>
              Navigation
            </p>
            {internalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
              >
                {link.label}
              </Link>
            ))}
          </AnimatedCard>

          {/* Connect */}
          <AnimatedCard>
            <p style={{ color: 'var(--t28)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 1.25rem 0', fontWeight: 500 }}>
              Connect
            </p>
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
              >
                {link.label}
              </a>
            ))}
          </AnimatedCard>
        </AnimatedCardGrid>

        {/* Bottom row */}
        <AnimatedTextBlock
          delay={0.1}
          style={{
            borderTop: '1px solid var(--t07)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--t18)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, fontWeight: 300 }}>
            Built for clearer brand presence.
          </p>
          <p style={{ color: 'var(--t10)', fontSize: '0.62rem', letterSpacing: '0.12em', margin: 0, fontWeight: 300 }}>
            © {new Date().getFullYear()} Hazem Abdelbaset
          </p>
        </AnimatedTextBlock>
      </div>
    </AnimatedSection>
  )
}
