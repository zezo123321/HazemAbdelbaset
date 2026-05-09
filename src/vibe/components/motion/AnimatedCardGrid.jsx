import { motion, useReducedMotion } from 'framer-motion'
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  reducedFadeIn,
  viewportOnce,
} from '../../utils/motion'

export default function AnimatedCardGrid({
  children,
  className = '',
  style = {},
  speed = 'normal',   // 'fast' | 'normal' | 'slow'
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion()

  const containers = { fast: staggerContainerFast, normal: staggerContainer, slow: staggerContainerSlow }
  const variant = prefersReducedMotion ? reducedFadeIn : (containers[speed] || staggerContainer)

  return (
    <motion.div
      className={className}
      style={style}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
