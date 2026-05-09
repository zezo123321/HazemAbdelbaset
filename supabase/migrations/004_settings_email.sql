-- ═══════════════════════════════════════════════════════════════
-- 004 — SETTINGS & EMAIL CONFIGURATION
-- ═══════════════════════════════════════════════════════════════

-- ─── SETTINGS ─────────────────────────────────────────────────
-- Generic key-value store for app configuration (booking profile, google tokens, etc.)
CREATE TABLE IF NOT EXISTS settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- ─── EMAIL SETTINGS ──────────────────────────────────────────
-- Per-source email template configuration for transactional emails
CREATE TABLE IF NOT EXISTS email_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT UNIQUE NOT NULL,              -- e.g. contact_page, newsletter, career_application, testimonials_talk
    sender_email TEXT,
    subject TEXT,
    body_text TEXT,                           -- HTML template with {{name}}, {{email}} placeholders
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_settings_source ON email_settings(source);

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trigger_settings_updated_at ON settings;
CREATE TRIGGER trigger_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_email_settings_updated_at ON email_settings;
CREATE TRIGGER trigger_email_settings_updated_at
    BEFORE UPDATE ON email_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

-- Settings: only admins can read/write
CREATE POLICY "Admins full access on settings" ON settings
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Email settings: admins can read/write, server actions also read via service role
CREATE POLICY "Admins full access on email_settings" ON email_settings
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Public read needed for server actions that send emails (they use service role key)
-- No public policy needed — service role bypasses RLS
