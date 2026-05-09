import { motion, useReducedMotion } from 'framer-motion'
import { ease as editorialEasing } from '../../utils/motion'

export default function EditorialImage({ src, alt, aspectRatio = '4/5', className = '', style = {} }) {
  const prefersReducedMotion = useReducedMotion()

  const maskReveal = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { 
      clipPath: 'inset(0% 0 0 0)', 
      transition: { duration: 1.2, ease: editorialEasing } 
    }
  }

  const imageScale = {
    hidden: { scale: 1.15 },
    visible: { 
      scale: 1, 
      transition: { duration: 1.2, ease: editorialEasing } 
    }
  }

  const safeReveal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  // If the image src is a placeholder path that doesn't exist, we render a styled placeholder block instead
  const isPlaceholder = src.includes('/images/')

  return (
    <motion.div
      variants={prefersReducedMotion ? safeReveal : maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        aspectRatio,
        backgroundColor: 'var(--surface)',
        ...style
      }}
    >
      {isPlaceholder ? (
        <motion.div
          variants={prefersReducedMotion ? safeReveal : imageScale}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--surface-2)',
            color: 'var(--t28)',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          [ Image Placeholder: {alt} ]
        </motion.div>
      ) : (
        <motion.img
          variants={prefersReducedMotion ? safeReveal : imageScale}
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
    </motion.div>
  )
}
