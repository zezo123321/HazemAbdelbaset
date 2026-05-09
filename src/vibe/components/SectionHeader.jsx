import AnimatedTextBlock from './motion/AnimatedTextBlock'

export default function SectionHeader({ number, label, align = 'left', className = '' }) {
  return (
    <AnimatedTextBlock
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        marginBottom: '3rem',
      }}
      className={className}
    >
      <span
        style={{
          color: 'var(--accent)',
          fontSize: '0.68rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        ({number})
      </span>
      <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
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
  )
}
