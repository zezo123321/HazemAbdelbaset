# Supabase Setup Guide for Non-Technical Users

This guide walks you through setting up the database and security for your website. Take your time and follow the steps exactly.

---

## Step 1: Create a Supabase Project
1. Open your web browser and go to **[supabase.com](https://supabase.com)**.
2. Click **Start your project** (or **Sign in** if you already have an account).
3. Click **New Project**.
4. Give it a name (like "My Website Backend").
5. Create a strong database password (save this password somewhere safe!).
6. Choose a region close to you.
7. Click **Create new project**.
8. **Wait about 1–2 minutes** while Supabase sets everything up. The screen will change when it's ready.

---

## Step 2: Run the SQL Migrations
Your website needs specific tables (like spreadsheets) to store blogs, projects, etc. We have files that tell Supabase exactly how to build these tables.

1. On the left side menu in Supabase, look for a button called **SQL Editor** (it looks like a little terminal window). Click it.
2. Click the **+ New Query** button.
3. You need to copy and paste code from files inside your `Final Website/supabase/migrations/` folder.
4. **IMPORTANT**: You must run them in this exact order:

   **First File:** Open `006_admin_users.sql` on your computer.
   * Copy all the text inside it.
   * Paste it into the empty box in the Supabase SQL Editor.
   * Click the green **Run** button. Wait for it to say "Success".
   
   **Second File:** Clear the box. Open `001_core_tables.sql`.
   * Copy, paste, and click **Run**.
   
   **Third File:** Clear the box. Open `002_contacts_subscriptions.sql`.
   * Copy, paste, and click **Run**.
   
   **Fourth File:** Clear the box. Open `003_scheduling.sql`.
   * Copy, paste, and click **Run**.
   
   **Fifth File:** Clear the box. Open `004_settings_email.sql`.
   * Copy, paste, and click **Run**.
   
   **Sixth File:** Clear the box. Open `005_career_workshop.sql`.
   * Copy, paste, and click **Run**.

---

## Step 3: Create Your Login Account
Now we create your actual account so you can log into the website.

1. On the left side menu in Supabase, click **Authentication**.
2. Go to the **Users** tab.
3. Click the **Add User** button, then select **Create new user**.
4. Enter your email address and a strong password.
5. Click **Create User**.
6. You will see your new account listed. Look for the column called **User UID** (it's a long string of letters and numbers like `a1b2c3d4-...`). 
7. Click on that long string to copy it to your clipboard.

---

## Step 4: Make Yourself an Admin
Right now, you have an account, but the website doesn't know you are the owner. We need to tell the security system to let you into the Admin Dashboard.

1. Go back to the **SQL Editor** in Supabase.
2. Click **+ New Query**.
3. Copy the code below and paste it into the box:

```sql
INSERT INTO admin_users (user_id, email, role)
VALUES (
    'YOUR_COPIED_UID_HERE',
    'your.email@example.com',
    'admin'
);
```

4. Change `YOUR_COPIED_UID_HERE` to the long string you copied in Step 3. Keep the single quotes `'` around it!
5. Change `your.email@example.com` to the email you used.
6. Click the green **Run** button. You are now officially an admin!

---

## Step 5: Create Storage Buckets
The website needs places to store images.

1. On the left side menu in Supabase, click **Storage**.
2. Click the **New Bucket** button.
3. Name the bucket exactly this: `event-uploads`
4. Toggle the switch that says **Public bucket** to ON.
5. Click **Save**.
6. Click **New Bucket** again.
7. Name this one exactly this: `blog-images`
8. Toggle **Public bucket** to ON.
9. Click **Save**.

---

## Step 6: Connect the Code to Supabase
Finally, we give your local website the "keys" to talk to Supabase.

1. On the left side menu in Supabase, click **Project Settings** (the gear icon at the bottom).
2. Click on **API** in the settings menu.
3. You will see a section called **Project URL**. Copy the URL.
4. You will see a section called **Project API Keys** with a key called `anon` / `public`. Copy that long key.
5. Go to your computer. Inside the `Final Website` folder, look for a file called `supabase/env.example`.
6. Make a copy of that file and rename the copy to `.env.local` (make sure it's in the main `Final Website` folder).
7. Open `.env.local` and paste in your URL and Key:

```
NEXT_PUBLIC_SUPABASE_URL=paste-your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-long-key-here
```
8. Save the file.

---

## Step 7: Test Everything!

1. Open your Terminal (command prompt) on your Mac.
2. Make sure you are inside the `Final Website` folder: `cd "Final Website"`
3. Run the site: `npm run dev`
4. Open your web browser and go to `http://localhost:3000`
5. Go to `http://localhost:3000/login`
6. Enter your email and password.
7. If everything worked, you should see the Admin Dashboard! You can now click on **Blogs** and try writing your first blog post.
