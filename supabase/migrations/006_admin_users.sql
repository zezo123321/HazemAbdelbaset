-- 006 - ADMIN USERS TABLE
-- This table controls who has admin access to the dashboard.
-- Being authenticated is not enough; a user must also exist here.

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- Helper used by RLS policies and server-side checks.
-- SECURITY DEFINER lets the function check admin_users without recursing
-- through admin_users' own RLS policies.
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = check_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage admin_users" ON admin_users;

-- Only existing admins can read or manage the admin list.
CREATE POLICY "Admins can read admin_users" ON admin_users
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage admin_users" ON admin_users
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- SEED YOUR FIRST ADMIN
-- After creating a user in Supabase Auth, copy the user's UUID and run:
--
-- INSERT INTO admin_users (user_id, email, role)
-- VALUES ('YOUR_AUTH_USER_UUID_HERE', 'your@email.com', 'admin');
