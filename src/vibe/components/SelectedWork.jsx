import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from '@/vibe/router'
import { caseStudies } from '../data/case-studies'
import AnimatedTextBlock from './motion/AnimatedTextBlock'
import CaseStudyCard from './CaseStudyCard'

export default function SelectedWork({ showViewAll = false }) {
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
      // Check absolute value to support potential RTL flipping safely
      setCanScrollLeft(Math.abs(scrollLeft) > 5)
      setCanScrollRight(Math.abs(scrollLeft) < scrollWidth - clientWidth - 5)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [checkScroll])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
    trackRef.current.style.scrollSnapType = 'none'
  }

  const handleMouseLeave = () => {
    if (!isDragging) return
    setIsDragging(false)
    trackRef.current.style.scrollSnapType = 'x mandatory'
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    trackRef.current.style.scrollSnapType = 'x mandatory'
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Drag speed
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollByAmount = (direction) => {
    if (trackRef.current) {
      // Scroll by one card width roughly
      const amount = trackRef.current.clientWidth * 0.8
      trackRef.current.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="work"
      style={{
        padding: '8rem 0',
        borderBottom: '1px solid var(--t07)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem', marginBottom: '4rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <AnimatedTextBlock
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>(04)</span>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--t18)' }} />
            <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Selected Work</span>
          </AnimatedTextBlock>

          {/* Navigation Controls */}
          <AnimatedTextBlock delay={0.1} style={{ display: 'flex', gap: '1rem' }}>
            <button 
               onClick={() => scrollByAmount('prev')}
               disabled={!canScrollLeft}
               className="nav-btn"
               aria-label="Previous Project"
            >
               ←
            </button>
            <button 
               onClick={() => scrollByAmount('next')}
               disabled={!canScrollRight}
               className="nav-btn"
               aria-label="Next Project"
            >
               →
            </button>
          </AnimatedTextBlock>
        </div>
      </div>

      {/* Horizontal Project Track */}
      <div 
        ref={trackRef}
        className={`horizontal-track ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={checkScroll}
        style={{ 
          display: 'flex', 
          gap: '2rem', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          padding: '0 4vw 4rem 4vw',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`
          .horizontal-track::-webkit-scrollbar {
            display: none;
          }
          .horizontal-track {
            cursor: grab;
          }
          .horizontal-track.dragging {
            cursor: grabbing;
            user-select: none;
          }
          .horizontal-track.dragging a {
            pointer-events: none;
          }
          .nav-btn {
            width: 48px;
            height: 48px;
            border: 1px solid var(--t18);
            border-radius: 50%;
            background: transparent;
            color: var(--text);
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .nav-btn:not(:disabled):hover {
            border-color: var(--text);
            background: var(--text);
            color: var(--bg);
          }
          .nav-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
          @media (min-width: 900px) {
            .horizontal-track {
              gap: 4rem !important;
              padding: 0 5vw 4rem 5vw !important;
            }
          }
        `}</style>
        {caseStudies.map((project, i) => (
          <CaseStudyCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem' }}>
        {/* View all work */}
        {showViewAll && (
          <AnimatedTextBlock
            delay={0.2}
            style={{ marginTop: '2rem', textAlign: 'center' }}
          >
            <Link
              to="/case-studies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: 'var(--t40)',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid var(--t10)',
                padding: '0.85rem 2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)'
                e.currentTarget.style.borderColor = 'var(--t28)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--t40)'
                e.currentTarget.style.borderColor = 'var(--t10)'
              }}
            >
              View all work
              <span>→</span>
            </Link>
          </AnimatedTextBlock>
        )}
      </div>
    </section>
  )
}
