# Non-Technical Setup Guide

This guide explains everything in simple, non-technical language.

---

## What Is Supabase?

**Supabase is your database and login system.** Think of it like a big filing cabinet that stores:
- Your blog posts
- Your project portfolio
- Contact form messages
- Newsletter subscribers
- Booking/scheduling data
- Admin user information

It also handles **who can log in** to the admin dashboard.

You don't need to install anything on your computer — Supabase runs online at [supabase.com](https://supabase.com).

---

## What Does "Admin Login" Mean?

Your website has two parts:
1. **The public website** — what visitors see (blog, portfolio, contact form)
2. **The admin dashboard** — where you manage everything (create blogs, edit projects, etc.)

The admin dashboard is at `/admin` and is password-protected. Only people you approve can access it.

**Being logged in is not enough.** Even if someone creates an account, they cannot access the admin dashboard unless you specifically add them to the admin list.

---

## What You Need to Create Manually

### Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (free tier is fine)
3. Create a new project — pick any name and a strong database password
4. Wait for the project to finish setting up (about 1 minute)

### Step 2: Run the Database Setup
1. In your Supabase project, click **SQL Editor** in the sidebar
2. Click **New Query**
3. Open the file `supabase/migrations/006_admin_users.sql` from this project
4. Copy its contents and paste into the SQL Editor
5. Click **Run** ▶️
6. Repeat for files `001_core_tables.sql` through `005_career_workshop.sql`

**Run them in this order:**
1. `006_admin_users.sql` ← FIRST
2. `001_core_tables.sql`
3. `002_contacts_subscriptions.sql`
4. `003_scheduling.sql`
5. `004_settings_email.sql`
6. `005_career_workshop.sql`

### Step 3: Create Your Login User
1. In Supabase, go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter your email and a strong password
4. Click **Create User**
5. You'll see a new row — click on it
6. Copy the **UID** (a long code like `12345678-abcd-1234-efgh-123456789012`)

### Step 4: Make Yourself an Admin
1. Go back to **SQL Editor**
2. Open the file `supabase/setup/create-first-admin.sql`
3. Replace `REPLACE_WITH_AUTH_USER_UUID` with the UID you copied
4. Replace `your@email.com` with your actual email
5. Click **Run** ▶️

### Step 5: Create Storage Buckets
1. In Supabase, click **Storage** in the sidebar
2. Click **New Bucket**
3. Name: `event-uploads`, toggle "Public bucket" ON, click Create
4. Click **New Bucket** again
5. Name: `blog-images`, toggle "Public bucket" ON, click Create

### Step 6: Set Environment Variables
1. In Supabase, go to **Settings** > **API**
2. Copy "Project URL" and "anon public" key
3. In this project folder, create a file called `.env.local`
4. Copy the contents from `supabase/env.example` into `.env.local`
5. Replace the placeholder values with your real Supabase values

### Step 7: Run the Website
1. Open Terminal
2. Navigate to this folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Open `http://localhost:3000` in your browser
6. Go to `http://localhost:3000/login` to test admin login

---

## What You Should NOT Touch

- **`node_modules/` folder** — auto-generated, don't edit
- **`.next/` folder** — auto-generated build files
- **`src/utils/supabase/`** — critical connection code
- **Migration files** — already set up correctly
- **`package.json`** — project configuration

---

## How to Know If Things Are Working

| Test | Expected Result |
|------|----------------|
| Visit `localhost:3000` | You see the website homepage |
| Visit `localhost:3000/login` | You see a login page |
| Login with your email/password | You're redirected to the admin dashboard |
| Visit `localhost:3000/admin` without login | You're redirected to `/login` |
| Create a new blog post | It appears at `/blog/your-slug` |
| Run `npm run audit:admin` | Shows "✅ Passed: 27" with no failures |

---

## Getting Help

If something doesn't work:
1. Check that your `.env.local` file has the correct Supabase URL and keys
2. Check that you ran all migration files in Supabase
3. Check that you created an admin user (Steps 3-4 above)
4. Try restarting the dev server: stop it (Ctrl+C) and run `npm run dev` again
