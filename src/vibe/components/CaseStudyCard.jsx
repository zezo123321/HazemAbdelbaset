import { Link } from '@/vibe/router'
import AnimatedCard from './motion/AnimatedCard'
import EditorialImage from './motion/EditorialImage'

export default function CaseStudyCard({ project, index = 0 }) {
  return (
    <AnimatedCard
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '85vw',
        maxWidth: '1100px',
        minWidth: '320px',
        height: '70vh',
        minHeight: '550px',
        maxHeight: '800px',
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--t07)',
        scrollSnapAlign: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t07)' }}
    >
      <div className="case-study-split" style={{ height: '100%' }}>
        {/* Text Info */}
        <div className="case-study-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span
              style={{
                color: 'rgba(var(--accent-rgb), 0.4)',
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                fontFamily: 'monospace',
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                color: 'var(--t40)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              {project.category} · {project.year}
            </span>
          </div>

          <h3
            style={{
              color: 'var(--text)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              margin: '0 0 1rem 0',
              lineHeight: 1.05,
              transition: 'color 0.3s ease',
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              color: 'var(--accent)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              fontStyle: 'italic',
              margin: '0 0 2rem 0',
            }}
          >
            "{project.headline}"
          </p>

          <span style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            Context
          </span>
          <p
            style={{
              color: 'var(--t70)',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              fontWeight: 300,
              margin: '0 0 2rem 0',
            }}
          >
            {project.shortDescription || (project.problem && project.problem.substring(0, 100) + '...')}
          </p>

          <Link
            to={`/work/${project.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '1rem 2rem',
              border: '1px solid var(--t18)',
              transition: 'all 0.3s ease',
              alignSelf: 'flex-start',
              marginTop: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--text)'
              e.currentTarget.style.color = 'var(--bg)'
              e.currentTarget.style.borderColor = 'var(--text)'
              e.currentTarget.style.gap = '0.9rem'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'var(--t18)'
              e.currentTarget.style.gap = '0.6rem'
            }}
          >
            View Case Study <span>→</span>
          </Link>
        </div>

        {/* Visual Block */}
        <div className="case-study-visual">
          <EditorialImage 
            src={`/images/placeholder-${project.slug}.jpg`} 
            alt={project.name}
            aspectRatio="auto"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <style>{`
        .case-study-split {
          display: flex;
          flex-direction: column-reverse;
          height: 100%;
        }
        .case-study-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 3rem;
        }
        .case-study-visual {
          flex: 1;
          overflow: hidden;
          background-color: var(--surface);
        }

        @media (min-width: 900px) {
          .case-study-split {
            flex-direction: row;
          }
          .case-study-text {
            flex: 0 0 40%;
            padding: 4rem;
            justify-content: center;
          }
          .case-study-visual {
            flex: 0 0 60%;
          }
        }
      `}</style>
    </AnimatedCard>
  )
}
