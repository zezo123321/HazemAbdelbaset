import { motion, useReducedMotion } from 'framer-motion'
import { staggerItem, reducedFadeIn } from '../../utils/motion'

export default function AnimatedCard({
  children,
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
  as: Component = 'div',
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      className={className}
      style={style}
      variants={prefersReducedMotion ? reducedFadeIn : staggerItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}
