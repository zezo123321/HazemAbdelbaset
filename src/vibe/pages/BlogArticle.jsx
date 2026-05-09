import { useParams, Link } from '@/vibe/router'
import { blogPosts } from '../data/blog-posts'
import PageTransition from '../components/PageTransition'
import BlogCard from '../components/BlogCard'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'
import AnimatedCardGrid from '../components/motion/AnimatedCardGrid'
import MotionButton from '../components/motion/MotionButton'

export default function BlogArticle() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <PageTransition>
        <div style={{ padding: '12rem 4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--t40)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Article not found.</p>
          <Link to="/blog" style={{ color: 'var(--accent)', fontSize: '0.82rem', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ← Back to blog
          </Link>
        </div>
      </PageTransition>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2)

  return (
    <PageTransition>
      {/* Article hero */}
      <section
        style={{
          padding: 'clamp(7rem, 12vw, 10rem) 4rem 5rem',
          borderBottom: '1px solid var(--t07)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.08), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedTextBlock style={{ marginBottom: '3rem' }}>
            <Link
              to="/blog"
              style={{
                color: 'var(--t28)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t28)')}
            >
              ← Blog
            </Link>
          </AnimatedTextBlock>

          {/* Meta */}
          <AnimatedTextBlock
            delay={0.1}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500 }}>
              {post.category}
            </span>
            <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
            <span style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.12em' }}>
              {post.readTime} min read
            </span>
            <span style={{ color: 'var(--t18)', fontSize: '0.5rem' }}>◆</span>
            <span style={{ color: 'var(--t28)', fontSize: '0.62rem', letterSpacing: '0.12em' }}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </span>
          </AnimatedTextBlock>

          {/* Arabic title */}
          <AnimatedTextBlock
            as="h1"
            delay={0.15}
            dir="rtl"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              margin: '0 0 1rem 0',
              textAlign: 'right',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {post.titleAr}
          </AnimatedTextBlock>

          <AnimatedTextBlock
            as="p"
            delay={0.3}
            style={{
              color: 'var(--t40)',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              margin: 0,
            }}
          >
            {post.excerptEn}
          </AnimatedTextBlock>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: '5rem 4rem', borderBottom: '1px solid var(--t07)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <AnimatedTextBlock
            as="p"
            dir="rtl"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: 'var(--t85)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              lineHeight: 1.9,
              textAlign: 'right',
              margin: '0 0 3rem 0',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              fontWeight: 400,
            }}
          >
            {post.content.intro}
          </AnimatedTextBlock>

          {post.content.body.map((para, i) => (
            <AnimatedTextBlock
              key={i}
              as="p"
              dir="rtl"
              style={{
                fontFamily: "'Cairo', sans-serif",
                color: 'var(--text)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                lineHeight: 2.1,
                textAlign: 'right',
                margin: '0 0 2rem 0',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                fontWeight: 300,
              }}
            >
              {para}
            </AnimatedTextBlock>
          ))}

          <AnimatedTextBlock
            style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '1.5rem',
              marginTop: '4rem',
            }}
          >
            <p
              dir="rtl"
              style={{
                fontFamily: "'Cairo', sans-serif",
                color: 'var(--text)',
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                lineHeight: 1.9,
                textAlign: 'right',
                margin: 0,
                fontWeight: 500,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {post.content.conclusion}
            </p>
          </AnimatedTextBlock>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ padding: '5rem 4rem', borderBottom: '1px solid var(--t07)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p
              style={{
                color: 'var(--t18)',
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              Related articles
            </p>
            <AnimatedCardGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </AnimatedCardGrid>
          </div>
        </section>
      )}

      {/* CTA */}
      <AnimatedSection style={{ padding: '6rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <AnimatedTextBlock
            as="p"
            style={{ color: 'var(--t40)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, margin: '0 0 2rem 0' }}
          >
            If this thinking resonates, your brand might need a visual system — not just better posts.
          </AnimatedTextBlock>
          <AnimatedTextBlock delay={0.1}>
            <MotionButton
              to="/start-project"
              style={{
                padding: '0.95rem 2.2rem',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--btn-bg)')}
            >
              Start a project ↗
            </MotionButton>
          </AnimatedTextBlock>
        </div>
      </AnimatedSection>
    </PageTransition>
  )
}
