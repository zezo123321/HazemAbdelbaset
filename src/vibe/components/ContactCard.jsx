import AnimatedCard from './motion/AnimatedCard'

export default function ContactCard({ contact, index = 0 }) {
  return (
    <AnimatedCard
      style={{
        border: '1px solid var(--t07)',
        padding: '2.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.2)'
        e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb), 0.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--t07)'
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <span
        style={{
          color: 'var(--accent)',
          fontSize: '0.65rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {contact.label}
      </span>

      <p
        style={{
          color: 'var(--t55)',
          fontSize: '0.88rem',
          lineHeight: 1.7,
          fontWeight: 300,
          margin: 0,
          flex: 1,
        }}
      >
        {contact.description}
      </p>

      <a
        href={contact.href}
        target={contact.external ? '_blank' : undefined}
        rel={contact.external ? 'noopener noreferrer' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text)',
          fontSize: '0.72rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderBottom: '1px solid var(--t18)',
          paddingBottom: '0.25rem',
          transition: 'color 0.2s ease, border-color 0.2s ease',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)'
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text)'
          e.currentTarget.style.borderColor = 'var(--t18)'
        }}
      >
        {contact.buttonText} ↗
      </a>
    </AnimatedCard>
  )
}
