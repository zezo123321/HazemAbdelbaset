// ─── Motion system: shared Framer Motion variants + viewport defaults ─────
// Editorial, calm, no bounce. Animate transform + opacity only.

export const ease = [0.22, 1, 0.36, 1]
export const easeOut = [0.16, 1, 0.3, 1]

// Default viewport triggers
export const viewportOnce = { once: true, amount: 0.2 }
export const viewportEarly = { once: true, amount: 0.05 }
export const viewportDeep = { once: true, amount: 0.35 }

// ─── Single-element variants ──────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const fadeUpSlow = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
}

export const scaleInSubtle = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
}

// ─── Stagger system ───────────────────────────────────────────────────────

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.03 },
  },
}

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.08 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
}

// ─── Specialty ────────────────────────────────────────────────────────────

export const labelReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// Hero-style line reveal — slides up from below an overflow:hidden container
export const lineReveal = {
  hidden: { y: '115%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.05, ease: easeOut } },
}

// Page-level entrance (used by PageTransition)
export const pageReveal = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: 'easeIn' } },
}

// Reduced-motion fallback — pure opacity, no transform
export const reducedFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}
