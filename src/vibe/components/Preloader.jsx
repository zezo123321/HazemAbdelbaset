import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const totalDuration = 2200
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / totalDuration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setExiting(true)
          setTimeout(onComplete, 950)
        }, 400)
      }
    }

    requestAnimationFrame(animate)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(2rem, 4vw, 4rem)',
            backgroundColor: '#1A1A1A',
          }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top label */}
          <div
            style={{
              color: 'rgba(245,240,232,0.25)',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
            }}
          >
            HAZEM ABDELBASET
          </div>

          {/* Bottom row: tagline + counter */}
          <div className="flex items-end justify-between">
            <div
              style={{
                color: 'rgba(245,240,232,0.18)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
              }}
            >
              Brand-Led Visual Designer
            </div>

            <motion.div
              style={{
                color: '#F5F0E8',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(5rem, 15vw, 11rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {count}%
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0"
            style={{ height: '2px', backgroundColor: '#20C997' }}
            initial={{ width: '0%' }}
            animate={{ width: `${count}%` }}
            transition={{ ease: 'linear', duration: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
