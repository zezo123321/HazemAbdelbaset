-- ═══════════════════════════════════════════════════════════════
-- CREATE YOUR FIRST ADMIN USER
-- ═══════════════════════════════════════════════════════════════
--
-- STEP 1: Create a user in Supabase Auth
--   Go to: Supabase Dashboard > Authentication > Users > Add User
--   Enter your email and a strong password
--   Click "Create User"
--
-- STEP 2: Copy the user's UUID
--   Click on the newly created user
--   Copy the UUID shown (it looks like: 12345678-abcd-1234-efgh-123456789012)
--
-- STEP 3: Replace the placeholder below and run this SQL
--   Go to: Supabase Dashboard > SQL Editor > New Query
--   Paste the SQL below, replace the placeholders, and click "Run"

INSERT INTO admin_users (user_id, email, role)
VALUES (
    'REPLACE_WITH_AUTH_USER_UUID',    -- paste the UUID from Step 2 here
    'your@email.com',                 -- replace with your actual email
    'admin'                           -- keep this as 'admin'
);

-- ═══════════════════════════════════════════════════════════════
-- VERIFY IT WORKED
-- Run this query after the insert. You should see one row.
-- ═══════════════════════════════════════════════════════════════

SELECT * FROM admin_users;
