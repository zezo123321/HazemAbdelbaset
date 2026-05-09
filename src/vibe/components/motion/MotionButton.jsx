import { motion } from 'framer-motion'
import { Link } from '@/vibe/router'

export default function MotionButton({
  children,
  to,
  href,
  onClick,
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    ...style,
  }

  const hoverProps = {
    whileHover: { y: -2, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 },
  }

  if (to) {
    return (
      <motion.div {...hoverProps} style={{ display: 'inline-block' }}>
        <Link
          to={to}
          className={className}
          style={baseStyle}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...rest}
        >
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <motion.div {...hoverProps} style={{ display: 'inline-block' }}>
        <a
          href={href}
          className={className}
          style={baseStyle}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...rest}
        >
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...hoverProps}
      className={className}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
