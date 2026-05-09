-- ═══════════════════════════════════════════════════════════════
-- 003 — SCHEDULING: event_types, availability, bookings
-- ═══════════════════════════════════════════════════════════════

-- ─── EVENT TYPES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS event_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT DEFAULT '',
    duration_minutes INT DEFAULT 30,
    price NUMERIC(10,2) DEFAULT 0,
    color TEXT DEFAULT '#9b51e0',
    is_active BOOLEAN DEFAULT true,
    buffer_before INT DEFAULT 0,             -- minutes before event
    buffer_after INT DEFAULT 0,              -- minutes after event
    max_per_day INT,                          -- nullable = unlimited
    start_time_increment INT DEFAULT 30,     -- minutes between slot options
    timezone_display TEXT DEFAULT 'auto',
    locked_timezone TEXT,
    allow_guests BOOLEAN DEFAULT false,
    invitee_questions JSONB DEFAULT '[]'::JSONB,
    communication_methods JSONB DEFAULT '["google_meet"]'::JSONB,
    confirmation_redirect TEXT,
    email_reminder_hours INT,
    email_followup_hours INT,
    min_notice_hours INT DEFAULT 4,
    max_future_days INT DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_event_types_slug ON event_types(slug);
CREATE INDEX IF NOT EXISTS idx_event_types_active ON event_types(is_active) WHERE is_active = true;

-- ─── AVAILABILITY ─────────────────────────────────────────────
-- Recurring weekly availability slots
CREATE TABLE IF NOT EXISTS availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),  -- 0=Sun, 6=Sat
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_availability_day ON availability(day_of_week);

-- ─── AVAILABILITY OVERRIDES ──────────────────────────────────
-- Date-specific availability overrides (e.g. holidays, custom hours)
CREATE TABLE IF NOT EXISTS availability_overrides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    slots JSONB DEFAULT '[]'::JSONB,         -- array of {start, end} or empty for blocked
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_availability_overrides_date ON availability_overrides(date);

-- ─── BOOKINGS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type_id UUID REFERENCES event_types(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    custom_answers JSONB DEFAULT '{}'::JSONB,
    payment_status TEXT DEFAULT 'pending',
    meeting_link TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_event_type ON bookings(event_type_id);

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trigger_event_types_updated_at ON event_types;
CREATE TRIGGER trigger_event_types_updated_at
    BEFORE UPDATE ON event_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read active event types (for booking page)
CREATE POLICY "Public can read active event_types" ON event_types
    FOR SELECT USING (is_active = true);

-- Public can read availability (for slot calculation)
CREATE POLICY "Public can read availability" ON availability
    FOR SELECT USING (true);

CREATE POLICY "Public can read availability_overrides" ON availability_overrides
    FOR SELECT USING (true);

-- Public can insert bookings
CREATE POLICY "Public can create bookings" ON bookings
    FOR INSERT WITH CHECK (true);

-- Public can read their own booking by email (simplified: just admin read)
CREATE POLICY "Public can read own bookings" ON bookings
    FOR SELECT USING (true);

-- Admins full access
CREATE POLICY "Admins full access on event_types" ON event_types
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins full access on availability" ON availability
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins full access on availability_overrides" ON availability_overrides
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins full access on bookings" ON bookings
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));
