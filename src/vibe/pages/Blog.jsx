import { useState } from 'react'
import { blogPosts, blogCategories } from '../data/blog-posts'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import BlogCard from '../components/BlogCard'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedCardGrid from '../components/motion/AnimatedCardGrid'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')

  const isAll = activeCategory === 'all'

  // Featured post — always the same post regardless of filter
  const featured = blogPosts.find((p) => p.featured)

  // Filtered posts based on active category
  const filtered = isAll
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  // The list of posts shown below the featured section (or below the filters when filtered)
  // In "all" mode: show everything except the featured post (it's shown separately above)
  // In filtered mode: show all filtered posts in order (featured section is hidden)
  const listPosts = isAll
    ? filtered.filter((p) => p.slug !== featured?.slug)
    : filtered

  // Find the active category label for the heading
  const activeCategoryLabel = blogCategories.find((c) => c.value === activeCategory)?.label || ''

  return (
    <PageTransition>
      <PageHero
        label="Blog / Insights"
        title="أفكار عن البراند،"
        titleAccent="السوشيال، والأنظمة البصرية."
        titleAr="كتابات قصيرة عن كيف يظهر البراند، كيف تُبنى الأنظمة البصرية، ولماذا التصميم لا يبدأ من الشكل فقط."
        subtitle="Short, direct writing about visual strategy, brand systems, and what actually makes a brand stronger."
      />

      <section className="blog-content-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Category filter */}
          <AnimatedTextBlock delay={0.1}>
            <div className="blog-filter-row">
              {blogCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`blog-filter-chip ${activeCategory === cat.value ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimatedTextBlock>

          {/* Featured article — only in "All" mode */}
          {isAll && featured && (
            <div style={{ marginBottom: '3rem' }}>
              <p className="blog-section-label">Featured</p>
              <BlogCard post={featured} index={0} featured />
            </div>
          )}

          {/* Section heading */}
          {listPosts.length > 0 && (
            <p className="blog-section-label">
              {isAll ? 'All articles' : `Articles in ${activeCategoryLabel}`}
            </p>
          )}

          {/* Articles list */}
          {listPosts.length > 0 ? (
            <AnimatedCardGrid
              key={activeCategory}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0',
                maxWidth: '800px',
              }}
            >
              {listPosts.map((post, i) => (
                <div key={post.slug}>
                  <BlogCard post={post} index={i} />
                </div>
              ))}
            </AnimatedCardGrid>
          ) : (
            <p style={{ color: 'var(--t28)', fontSize: '0.88rem', textAlign: 'center', padding: '4rem 0' }}>
              No articles in this category yet.
            </p>
          )}
        </div>

        <style>{`
          .blog-content-section {
            padding: 5rem 4rem 8rem;
            border-bottom: 1px solid var(--t07);
          }

          .blog-section-label {
            color: var(--t18);
            font-size: 0.62rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
            margin-top: 0;
          }

          /* Filter row */
          .blog-filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 4rem;
          }

          .blog-filter-chip {
            padding: 0.6rem 1.25rem;
            font-size: 0.65rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            border: 1px solid var(--t10);
            background-color: transparent;
            color: var(--t40);
            transition: all 0.25s ease;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .blog-filter-chip:hover {
            border-color: var(--t28);
            color: var(--t70);
          }
          .blog-filter-chip.active {
            border-color: var(--accent);
            background-color: rgba(var(--accent-rgb), 0.08);
            color: var(--accent);
          }
          .blog-filter-chip.active:hover {
            border-color: var(--accent);
            color: var(--accent);
          }

          /* Mobile: horizontal scrollable chips */
          @media (max-width: 768px) {
            .blog-content-section {
              padding: 3rem 1.5rem 5rem;
            }
            .blog-filter-row {
              flex-wrap: nowrap;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              margin-bottom: 3rem;
              padding-bottom: 0.5rem;
            }
            .blog-filter-row::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </section>
    </PageTransition>
  )
}

