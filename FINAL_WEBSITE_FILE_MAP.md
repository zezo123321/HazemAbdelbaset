# Final Website — File Map

This guide explains what each important folder in the project does.

---

## `src/app/` — All Pages

This is where every page of the website lives.

| Folder | What It Does |
|--------|-------------|
| `src/app/` | The homepage and main layout |
| `src/app/blog/` | Public blog pages (what visitors see) |
| `src/app/blog/[slug]/` | Individual blog post page |
| `src/app/portfolio/` | Portfolio/projects page |
| `src/app/case-studies/` | Case studies page |
| `src/app/book/` | Booking/scheduling page |
| `src/app/login/` | Admin login page |
| `src/app/about/` | About page |
| `src/app/contact/` | Contact page |
| `src/app/testimonials/` | Testimonials page |
| `src/app/career/` | Career applications page |
| `src/app/workshop/` | Workshop registration page |

## `src/app/admin/` — Admin Dashboard

This is the password-protected admin area. Only admins can access it.

| Folder | What It Does |
|--------|-------------|
| `src/app/admin/` | Dashboard home page |
| `src/app/admin/blogs/` | Create, edit, delete blog posts |
| `src/app/admin/projects/` | Manage portfolio projects |
| `src/app/admin/case-studies/` | Manage case studies |
| `src/app/admin/event-types/` | Manage booking event types |
| `src/app/admin/availability/` | Set scheduling availability |
| `src/app/admin/booking-profile/` | Booking page settings |
| `src/app/admin/email-settings/` | Email notification settings |
| `src/app/admin/popups/` | Popup builder and management |
| `src/app/admin/bookings/` | View submitted bookings |
| `src/app/admin/seed/` | Seed database with sample data |
| `src/app/admin/actions.ts` | **Core file** — all admin operations go through here |

## `src/components/` — Reusable Parts

These are building blocks used across multiple pages.

| Folder | What It Does |
|--------|-------------|
| `src/components/admin/` | Admin-specific components (form, rich text editor) |
| `src/components/blog/` | Blog page components (newsletter, cards) |
| `src/components/home/` | Homepage sections |
| `src/components/portfolio/` | Portfolio page components |
| `src/components/testimonials/` | Testimonials components |
| `src/components/ui/` | General UI elements (buttons, animations) |

## `src/lib/` — Utilities

| File | What It Does |
|------|-------------|
| `src/lib/blog-content.ts` | Converts blog content between formats (old → new) |
| `src/lib/constants.ts` | Sample/default content data |
| `src/lib/animations.ts` | Animation configurations |
| `src/lib/paymob.ts` | Payment integration |

## `src/utils/supabase/` — Database Connection

| File | What It Does |
|------|-------------|
| `server.ts` | Connects to Supabase from the server |
| `client.ts` | Connects to Supabase from the browser |
| `middleware.ts` | Protects admin routes and refreshes sessions |
| `admin.ts` | Admin-level database connection (bypasses security for server operations) |

## `supabase/` — Database Setup

| File/Folder | What It Does |
|-------------|-------------|
| `migrations/` | SQL files that create database tables |
| `setup/` | Helper SQL for first-time setup |
| `README.md` | Setup instructions |
| `env.example` | Template for environment variables |

## `docs/` — Documentation

| File | What It Does |
|------|-------------|
| `backend-setup.md` | Technical backend architecture |
| `supabase-migrations.md` | Database migration guide |
| `blog-editor.md` | How the blog editor works |
| `admin-blog-flow.md` | End-to-end blog creation flow |
| `next-steps.md` | What to do next |

## `public/` — Static Files

Images, icons, and other files that are served directly. Things like logos, favicons, and avatar images live here.

## `scripts/` — Helper Scripts

| File | What It Does |
|------|-------------|
| `audit-admin-auth.mjs` | Checks if admin security is set up correctly |
