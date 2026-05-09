-- ═══════════════════════════════════════════════════════════════
-- 001 — CORE CONTENT TABLES: blogs, projects, case_studies
-- ═══════════════════════════════════════════════════════════════

-- ─── BLOGS ────────────────────────────────────────────────────
-- Enhanced blog table with rich content support + backward compatibility
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    image TEXT,                          -- cover image URL (backward compat)
    content TEXT[],                      -- LEGACY: old paragraph array (backward compat)
    content_html TEXT,                   -- rendered HTML from TipTap editor
    content_json JSONB,                  -- TipTap JSON document structure
    content_text TEXT,                   -- plain text for search / excerpt fallback
    category TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published BOOLEAN DEFAULT false,
    seo_title TEXT,
    seo_description TEXT,
    author_id UUID,                      -- references auth.users(id), nullable for single-admin
    publish_date TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category) WHERE category IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- ─── PROJECTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    description TEXT,
    long_description TEXT,
    image TEXT,
    color TEXT,
    tools TEXT[] DEFAULT ARRAY[]::TEXT[],
    results TEXT[] DEFAULT ARRAY[]::TEXT[],
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published) WHERE published = true;

-- ─── CASE STUDIES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[] DEFAULT ARRAY[]::TEXT[],
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published) WHERE published = true;

-- ═══════════════════════════════════════════════════════════════
-- UPDATED_AT TRIGGERS
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_blogs_updated_at ON blogs;
CREATE TRIGGER trigger_blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_projects_updated_at ON projects;
CREATE TRIGGER trigger_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_case_studies_updated_at ON case_studies;
CREATE TRIGGER trigger_case_studies_updated_at
    BEFORE UPDATE ON case_studies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read published content only
CREATE POLICY "Public can read published blogs" ON blogs
    FOR SELECT USING (published = true);

CREATE POLICY "Public can read published projects" ON projects
    FOR SELECT USING (published = true);

CREATE POLICY "Public can read published case_studies" ON case_studies
    FOR SELECT USING (published = true);

-- Admins get full CRUD access (checked via admin_users table from 006)
-- These policies allow any authenticated user who exists in admin_users
CREATE POLICY "Admins full access on blogs" ON blogs
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins full access on projects" ON projects
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins full access on case_studies" ON case_studies
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));
