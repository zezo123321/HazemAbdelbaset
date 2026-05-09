# What To Do Next — Simple Checklist

Complete these steps in order. Check each one off as you go.

---

## Before You Can Use the Website

- [ ] **Create a Supabase project**
  - Go to [supabase.com](https://supabase.com) → Start your project
  - Save the Project URL and API keys

- [ ] **Run database migrations**
  - Open SQL Editor in Supabase Dashboard
  - Run `006_admin_users.sql` FIRST
  - Then run `001` through `005` in order
  - Each file creates the database tables you need

- [ ] **Create your auth user**
  - Go to Authentication → Users in Supabase
  - Click "Add User" → enter your email and password
  - Copy the user's UUID

- [ ] **Add yourself as admin**
  - Open `supabase/setup/create-first-admin.sql`
  - Replace the placeholder UUID with your real UUID
  - Run it in the SQL Editor

- [ ] **Create the blog-images storage bucket**
  - Go to Storage in Supabase
  - Click "New Bucket" → name: `blog-images` → Public: ON

- [ ] **Create the event-uploads storage bucket**
  - Click "New Bucket" → name: `event-uploads` → Public: ON

- [ ] **Set up environment variables**
  - Copy `supabase/env.example` to `.env.local` in the project root
  - Fill in your Supabase URL and API keys

- [ ] **Install and run locally**
  - Open Terminal in this folder
  - Run: `npm install`
  - Run: `npm run dev`
  - Open: `http://localhost:3000`

- [ ] **Test admin login**
  - Go to `http://localhost:3000/login`
  - Enter the email and password you created in Supabase
  - You should see the admin dashboard

- [ ] **Create your first blog post**
  - In the admin dashboard, click "Blogs" → "New Blog"
  - Write something using the rich text editor
  - Click "Save Changes"
  - Visit `http://localhost:3000/blog/your-slug` to see it

---

## After Setup Is Working

- [ ] **Run the security audit**: `npm run audit:admin`
- [ ] **Seed sample data** (optional): Use the Seed Database button in admin
- [ ] **Test all admin features**: projects, case studies, popups, scheduling

---

## Future Steps (Not Yet — Wait for Approval)

- [ ] Apply Hazem's brand design to the frontend
- [ ] Add blog image upload to Supabase Storage
- [ ] Add blog categories and search
- [ ] Deploy to production (Vercel)
- [ ] Connect custom domain
