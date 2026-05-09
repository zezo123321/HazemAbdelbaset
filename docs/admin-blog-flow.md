# Admin Blog Flow

## End-to-End Flow

```
Admin Dashboard (/admin/blogs/new)
  → Rich Text Editor (TipTap)
  → FormData submission
  → saveBlog Server Action
  → requireAdmin() check (admin_users table)
  → Validation (title, slug, content)
  → Supabase INSERT/UPDATE
  → revalidatePath (admin + public routes)
  → Public Blog Page (/blog/[slug])
  → normalizeBlogContent()
  → DOMPurify sanitization
  → Rich HTML rendering
```

## Step-by-Step

### 1. Create Blog
1. Admin navigates to `/admin/blogs/new`
2. Fills in: title, slug, excerpt, cover image, category, tags
3. Writes content in the TipTap rich text editor
4. Sets publish date and published checkbox
5. Optionally fills SEO title/description
6. Clicks "Save Changes"

### 2. Server Action Processing
1. `saveBlog()` is called with FormData
2. `requireAdmin()` verifies the user is in `admin_users`
3. Validation checks:
   - Title is required
   - Slug is required and valid format
   - Published blogs must have content
4. Rich content is extracted: `content_html`, `content_json`, `content_text`
5. `content` (text[]) is auto-generated from `content_text` for backward compat
6. `author_id` is auto-populated from the current session
7. Record is inserted/updated in Supabase
8. Next.js cache is cleared for admin and public blog routes

### 3. Public Rendering
1. `page.tsx` SSR queries Supabase for the blog by slug
2. Data is passed to `BlogClient.tsx` (client component)
3. `normalizeBlogContent()` determines the content format:
   - If `content_html` exists → use it (new format)
   - If only `content` (text[]) exists → convert to paragraph HTML (legacy)
4. HTML is sanitized via `DOMPurify.sanitize()`
5. Rich content is rendered via `dangerouslySetInnerHTML` with sanitized output
6. Table of Contents extracts real headings from the HTML

### 4. Edit Blog
1. Admin navigates to `/admin/blogs/[id]`
2. Blog data is fetched from Supabase including `content_json`
3. TipTap editor loads `content_json` for WYSIWYG editing
4. Changes are saved through the same `saveBlog()` flow

### 5. Delete Blog
1. Admin clicks delete on the blogs list
2. `deleteBlog()` calls `requireAdmin()` then deletes by ID
3. Cache is cleared for admin and public routes
