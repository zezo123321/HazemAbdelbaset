# Supabase Migrations

## Overview
All database tables are defined as SQL migration files in `supabase/migrations/`. These files are NOT auto-run — you must manually execute them in the Supabase SQL Editor.

## Migration Files

| File | Tables |
|------|--------|
| `006_admin_users.sql` | `admin_users` — **run first** |
| `001_core_tables.sql` | `blogs`, `projects`, `case_studies` |
| `002_contacts_subscriptions.sql` | `contacts`, `subscriptions` |
| `003_scheduling.sql` | `event_types`, `availability`, `availability_overrides`, `bookings` |
| `004_settings_email.sql` | `settings`, `email_settings` |
| `005_career_workshop.sql` | `career_applications`, `workshop_registrations` |
| `007_storage_buckets.sql` | Documentation only (buckets created via Dashboard) |
| `create_popups_tables.sql` | `popups`, `popup_fields`, `popup_submissions` (existing) |
| `create_assessment_submissions.sql` | `assessment_submissions` (existing) |

## Run Order
1. `006_admin_users.sql` — must be first because all RLS policies reference `admin_users`
2. `001_core_tables.sql`
3. `002_contacts_subscriptions.sql`
4. `003_scheduling.sql`
5. `004_settings_email.sql`
6. `005_career_workshop.sql`
7. Existing popup/assessment migrations
8. Existing popup upgrade migrations (v2, v3, v4)

## RLS Policy Design
Every table uses Row Level Security:
- **Public read** for published/active content only
- **Admin write** verified via `admin_users` table lookup
- **Public insert** for form submissions (contacts, subscriptions, bookings)
- **Service role** bypasses RLS for server-side operations (career apps, workshop registrations)

## Shared Trigger
All tables with `updated_at` columns use a shared trigger function:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Storage Buckets
Created via Dashboard, not SQL:
- `event-uploads` — popup images, CVs, workshop photos
- `blog-images` — blog cover images and inline content images
