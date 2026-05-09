# Backend Setup

## Architecture
This project uses **Next.js 16 App Router** as its full-stack framework:
- **Server Components** for SSR data fetching
- **Server Actions** (`'use server'`) for mutations (CRUD operations)
- **API Routes** (`src/app/api/`) for webhooks and external integrations
- **Supabase** for PostgreSQL database, auth, and file storage

## Backend Flow
```
Client Form → Server Action → requireAdmin() check → Supabase mutation → revalidatePath → UI refresh
```

## Admin Security Model
The system uses a two-layer authorization model:

1. **Middleware** (`src/middleware.ts`): Intercepts all requests. Redirects unauthenticated users away from `/admin` routes.
2. **`requireAdmin()`** (`src/app/admin/actions.ts`): Every admin Server Action verifies the authenticated user exists in the `admin_users` table. Being authenticated alone is NOT enough.

## Key Files
| File | Purpose |
|------|---------|
| `src/middleware.ts` | Route protection |
| `src/utils/supabase/server.ts` | SSR Supabase client |
| `src/utils/supabase/admin.ts` | Service role client (bypasses RLS) |
| `src/utils/supabase/middleware.ts` | Session refresh + admin redirect logic |
| `src/app/admin/actions.ts` | All CRUD Server Actions |
| `src/app/api/auth/actions.ts` | Login/logout Server Actions |
| `src/lib/blog-content.ts` | Blog content normalization utilities |

## Environment Variables
See `supabase/env.example` for the full list. Required:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public API key
- `SUPABASE_SERVICE_ROLE_KEY` — Private admin key
- `RESEND_API_KEY` — For transactional emails
