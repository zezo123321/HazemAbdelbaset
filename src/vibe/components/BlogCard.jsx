import { Link } from '@/vibe/router'
import AnimatedCard from './motion/AnimatedCard'

export default function BlogCard({ post, index = 0, featured = false }) {
  return (
    <AnimatedCard
      as="article"
      className="blog-card"
      style={{
        backgroundColor: 'transparent',
        borderTop: '1px solid var(--t07)',
        padding: featured ? '4rem 0' : '4rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, padding-left 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface)'
        e.currentTarget.style.paddingLeft = '1.5rem'
        e.currentTarget.style.paddingRight = '1.5rem'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.paddingLeft = '0'
        e.currentTarget.style.paddingRight = '0'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--accent)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s ease',
        }}
        className="blog-card-accent"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            color: 'var(--accent)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {post.category}
        </span>
        <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
        <span style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
          {post.readTime} min read
        </span>
        {featured && (
          <>
            <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
            <span
              style={{
                color: 'var(--accent-strong)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Featured
            </span>
          </>
        )}
      </div>

      <h3
        dir="rtl"
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontSize: featured ? 'clamp(1.1rem, 2vw, 1.6rem)' : 'clamp(1rem, 1.6vw, 1.3rem)',
          lineHeight: 1.65,
          color: 'var(--text)',
          fontWeight: 600,
          margin: 0,
          textAlign: 'right',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {post.titleAr}
      </h3>

      <p
        dir="rtl"
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontSize: '0.88rem',
          lineHeight: 1.85,
          color: 'var(--t55)',
          margin: 0,
          textAlign: 'right',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          fontWeight: 300,
        }}
      >
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span style={{ color: 'var(--t18)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          style={{
            color: 'var(--t40)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t40)')}
        >
          Read article ↗
        </Link>
      </div>
      <style>{`
        .blog-card:hover .blog-card-accent {
          transform: scaleX(1) !important;
        }
      `}</style>
    </AnimatedCard>
  )
}
