-- ═══════════════════════════════════════════════════════════════
-- 005 — CAREER APPLICATIONS & WORKSHOP REGISTRATIONS
-- ═══════════════════════════════════════════════════════════════

-- ─── CAREER APPLICATIONS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    age INT,
    city TEXT,
    university TEXT,
    track TEXT,                              -- ai, automation, vibe_coding
    experience_level TEXT,
    weekly_hours TEXT,
    portfolio_url TEXT,
    cv_url TEXT,
    motivation TEXT,
    tools_used TEXT,
    project_link TEXT,
    referral_source TEXT,
    status TEXT DEFAULT 'pending',           -- pending, reviewed, accepted, rejected
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_created_at ON career_applications(created_at DESC);

-- ─── WORKSHOP REGISTRATIONS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS workshop_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    photo_url TEXT,
    payment_status TEXT DEFAULT 'pending',   -- pending, paid, failed
    payment_order_id TEXT,
    payment_transaction_id TEXT,
    payment_amount NUMERIC(10,2),
    email_sent BOOLEAN DEFAULT false,
    whatsapp_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_workshop_registrations_email ON workshop_registrations(email);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_payment ON workshop_registrations(payment_status);

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trigger_workshop_registrations_updated_at ON workshop_registrations;
CREATE TRIGGER trigger_workshop_registrations_updated_at
    BEFORE UPDATE ON workshop_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Career: public can insert (via admin client/service role in code), admins read
-- Note: the code uses createAdminClient() which bypasses RLS for inserts
CREATE POLICY "Admins can read career_applications" ON career_applications
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can manage career_applications" ON career_applications
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Workshop: similar pattern — inserts via service role, admin reads
CREATE POLICY "Admins can read workshop_registrations" ON workshop_registrations
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can manage workshop_registrations" ON workshop_registrations
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));
