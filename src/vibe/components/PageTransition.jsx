import { motion } from 'framer-motion'

import { ease as editorialEasing } from '../utils/motion'

const variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1 },
  exit:    { opacity: 0, y: -8 },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        enter: { duration: 0.5, ease: editorialEasing },
        exit:  { duration: 0.35, ease: editorialEasing },
        duration: 0.5,
        ease: editorialEasing,
      }}
    >
      {children}
    </motion.div>
  )
}
