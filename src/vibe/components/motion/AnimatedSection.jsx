import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, reducedFadeIn, viewportOnce } from '../../utils/motion'

export default function AnimatedSection({
  children,
  className = '',
  style = {},
  id,
  delay = 0,
  as = 'section',
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[as] || motion.section

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
      id={id}
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
