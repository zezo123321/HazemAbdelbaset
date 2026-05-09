-- ═══════════════════════════════════════════════════════════════
-- 002 — CONTACTS & SUBSCRIPTIONS
-- ═══════════════════════════════════════════════════════════════

-- ─── CONTACTS ─────────────────────────────────────────────────
-- Stores contact form submissions and inquiry sources
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    message TEXT,
    source TEXT DEFAULT 'contact_page',      -- e.g. contact_page, testimonials_talk
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts(source);

-- ─── SUBSCRIPTIONS ────────────────────────────────────────────
-- Newsletter and source-specific email subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT DEFAULT 'newsletter',         -- e.g. newsletter, blog, case_studies
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(email, source)                     -- same email can subscribe from different sources
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_source ON subscriptions(source);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form submissions)
CREATE POLICY "Anyone can submit contact" ON contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe" ON subscriptions
    FOR INSERT WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can read contacts" ON contacts
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can read subscriptions" ON subscriptions
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Admins can delete
CREATE POLICY "Admins can delete contacts" ON contacts
    FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete subscriptions" ON subscriptions
    FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admin_users));
