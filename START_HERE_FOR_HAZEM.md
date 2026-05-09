# Start Here

Welcome! This folder (**Final Website**) is the official codebase for your website. 

Everything you need is in this folder. You do not need the old "New Website" folder anymore.

---

## 1. What Is This?
This is a modern, fast website with two parts:
* **The Public Website**: What visitors see (portfolio, case studies, blog, booking, etc.)
* **The Admin Dashboard**: A hidden, password-protected area where you can create and edit content.

## 2. What Is Already Done?
* The website layout and pages are built.
* The Admin Dashboard is fully built and secure.
* You have a rich-text editor to write beautiful blog posts.
* You can manage projects, case studies, popups, and your booking profile.
* **Security is rock-solid**: Nobody can access the Admin Dashboard unless you explicitly add their account to a special database list.

## 3. What You Must Do Next
Right now, the website is an "empty shell". It needs a brain and memory to store your content and user accounts. That brain is **Supabase**.

You need to:
1. Create a free account on Supabase.
2. Tell Supabase to create the necessary "tables" (like spreadsheets) for your blog, projects, etc.
3. Create an account for yourself and make yourself an Admin.
4. Link this website code to your Supabase project.

We have a step-by-step guide written just for you. **Open `SUPABASE_SETUP_FOR_NON_TECHNICAL_USER.md` to do this.**

## 4. How to Test Admin Login
Once you finish the Supabase setup:
1. Run the website locally (instructions in the setup guide).
2. Go to `http://localhost:3000/login`.
3. Type in the email and password you created in Supabase.
4. If successful, you will be taken to the Admin Dashboard.
5. If you try to go to `http://localhost:3000/admin` without logging in, the site will block you and ask you to log in.

## 5. How to Create Your First Blog
1. Log into the Admin Dashboard.
2. Click **Blogs** in the sidebar.
3. Click **New Blog**.
4. Fill in the Title, Slug (e.g., `my-first-post`), and Excerpt.
5. Use the rich text editor to write your content (you can add bold text, lists, headers, etc.).
6. Click **Save Changes**.
7. Go to `http://localhost:3000/blog/my-first-post` to see it live!

## 6. Important: What NOT to Touch
* Do NOT edit files inside `src/utils/supabase/` — this is complex security code.
* Do NOT edit the `node_modules` folder (these are downloaded system files).
* Do NOT edit `.env` or `.env.local` once you set them up. Keep your keys secret.
* Do NOT run the old "New Website" folder. Always work inside "Final Website".
