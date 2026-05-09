import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, reducedFadeIn, viewportOnce } from '../../utils/motion'

export default function AnimatedTextBlock({
  children,
  className = '',
  style = {},
  as: Component = 'div',
  delay = 0,
  ...rest          // ← passes dir, id, onClick, etc.
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[Component] || motion.div

  const variant = prefersReducedMotion ? reducedFadeIn : fadeUp
  const customVariant = {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        delay,
      },
    },
  }

  return (
    <MotionComponent
      className={className}
      style={style}
      variants={customVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}
