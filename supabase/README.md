# Supabase Setup & Migrations

## Overview
This project uses Supabase for PostgreSQL database, authentication, and file storage.

## Fresh Setup Steps

### 1. Create Supabase Project
1. Go to [database.new](https://database.new)
2. Create a new project
3. Save your project URL and keys

### 2. Environment Variables
Copy `env.example` to `.env.local` in the project root:
```bash
cp supabase/env.example .env.local
```
Fill in the values from your Supabase project settings (Settings > API).

### 3. Run Migrations
Execute each migration file **in order** in the Supabase SQL Editor (Dashboard > SQL Editor):

1. `006_admin_users.sql` — **Run this FIRST** (other tables reference it in RLS policies)
2. `001_core_tables.sql` — blogs, projects, case_studies
3. `002_contacts_subscriptions.sql` — contacts, subscriptions
4. `003_scheduling.sql` — event_types, availability, bookings
5. `004_settings_email.sql` — settings, email_settings
6. `005_career_workshop.sql` — career_applications, workshop_registrations
7. Existing: `create_popups_tables.sql` — popups system
8. Existing: `create_assessment_submissions.sql`
9. Existing: popup upgrade migrations (v2, v3, v4)

> **Important**: Run `006_admin_users.sql` first because all other tables' RLS policies reference the `admin_users` table.

### 4. Seed Your Admin User
After creating a user in Supabase Auth:
1. Go to Authentication > Users in the Supabase Dashboard
2. Click "Add User" and create an account with email/password
3. Copy the user's UUID
4. Run in SQL Editor:
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('YOUR_AUTH_USER_UUID', 'your@email.com', 'admin');
```

### 5. Storage Buckets
Create these buckets in Storage > New Bucket:

| Bucket | Public | Purpose |
|--------|--------|---------|
| `event-uploads` | Yes | Popup images, CVs, workshop photos |
| `blog-images` | Yes | Blog cover images and inline images |

Then add Storage Policies for each bucket (see `007_storage_buckets.sql` for policy SQL templates).

### 6. Email Settings (Optional)
Seed default email settings for the notification system:
```sql
INSERT INTO email_settings (source, sender_email, subject) VALUES
  ('contact_page', 'Your Name <contact@yourdomain.com>', 'Message Received'),
  ('newsletter', 'Your Name <newsletter@yourdomain.com>', 'Welcome to the Newsletter'),
  ('career_application', 'Your Name <career@yourdomain.com>', 'Application Received'),
  ('testimonials_talk', 'Your Name <hello@yourdomain.com>', 'Let''s Talk');
```

## Tables Reference

| Table | Migration | Purpose |
|-------|-----------|---------|
| `admin_users` | 006 | Admin authorization |
| `blogs` | 001 | Blog posts with rich content |
| `projects` | 001 | Portfolio projects |
| `case_studies` | 001 | Case studies |
| `contacts` | 002 | Contact form submissions |
| `subscriptions` | 002 | Email subscriptions |
| `event_types` | 003 | Booking event types |
| `availability` | 003 | Weekly availability |
| `availability_overrides` | 003 | Date-specific overrides |
| `bookings` | 003 | Scheduled bookings |
| `settings` | 004 | Key-value settings store |
| `email_settings` | 004 | Email template config |
| `career_applications` | 005 | Career form submissions |
| `workshop_registrations` | 005 | Workshop signups |
| `popups` | existing | Popup builder |
| `popup_fields` | existing | Popup form fields |
| `popup_submissions` | existing | Popup submissions |
| `assessment_submissions` | existing | Assessment data |

## Local Testing
```bash
cd "new Website"
cp supabase/env.example .env.local
# Fill in .env.local with your Supabase credentials
npm install
npm run dev
```
Then visit `http://localhost:3000/login` and sign in with your admin credentials.
