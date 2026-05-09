-- ═══════════════════════════════════════════════════════════════
-- 007 — STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════════
-- Supabase Storage buckets cannot be created via standard SQL.
-- You must create them via the Supabase Dashboard or the Management API.
--
-- This file documents the required buckets and their policies.
-- ═══════════════════════════════════════════════════════════════

-- ┌─────────────────────────────────────────────────────────────┐
-- │ BUCKET 1: event-uploads                                     │
-- │ Purpose: Popup images, CV uploads, workshop photos          │
-- │ Public: Yes (public read)                                   │
-- │ Max file size: 5 MB                                         │
-- │ Allowed MIME types: image/*, application/pdf                │
-- ├─────────────────────────────────────────────────────────────┤
-- │ Create via Dashboard:                                       │
-- │   1. Go to Storage > New Bucket                             │
-- │   2. Name: event-uploads                                    │
-- │   3. Public: ON                                             │
-- │   4. Max file size: 5242880 (5 MB)                          │
-- └─────────────────────────────────────────────────────────────┘

-- ┌─────────────────────────────────────────────────────────────┐
-- │ BUCKET 2: blog-images                                       │
-- │ Purpose: Blog post cover images and inline content images   │
-- │ Public: Yes (public read for blog rendering)                │
-- │ Max file size: 5 MB                                         │
-- │ Allowed MIME types: image/jpeg, image/png, image/webp,      │
-- │                     image/gif, image/svg+xml                │
-- ├─────────────────────────────────────────────────────────────┤
-- │ Create via Dashboard:                                       │
-- │   1. Go to Storage > New Bucket                             │
-- │   2. Name: blog-images                                      │
-- │   3. Public: ON                                             │
-- │   4. Max file size: 5242880 (5 MB)                          │
-- └─────────────────────────────────────────────────────────────┘

-- ═══════════════════════════════════════════════════════════════
-- STORAGE POLICIES (apply via Supabase Dashboard > Storage > Policies)
-- ═══════════════════════════════════════════════════════════════

-- For both buckets:

-- Policy: "Public read" (SELECT)
-- Target: public
-- Check: true
-- SQL equivalent:
-- CREATE POLICY "Public read event-uploads"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'event-uploads');

-- Policy: "Admin upload" (INSERT)
-- Target: authenticated
-- Check: auth.uid() IN (SELECT user_id FROM public.admin_users)
-- SQL equivalent:
-- CREATE POLICY "Admin upload event-uploads"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'event-uploads'
--     AND auth.uid() IN (SELECT user_id FROM public.admin_users)
--   );

-- Policy: "Admin update" (UPDATE)
-- Same check as above

-- Policy: "Admin delete" (DELETE)
-- Same using clause as above

-- ═══════════════════════════════════════════════════════════════
-- REPEAT FOR blog-images BUCKET
-- ═══════════════════════════════════════════════════════════════

-- CREATE POLICY "Public read blog-images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'blog-images');

-- CREATE POLICY "Admin upload blog-images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'blog-images'
--     AND auth.uid() IN (SELECT user_id FROM public.admin_users)
--   );

-- CREATE POLICY "Admin update blog-images"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'blog-images'
--     AND auth.uid() IN (SELECT user_id FROM public.admin_users)
--   );

-- CREATE POLICY "Admin delete blog-images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'blog-images'
--     AND auth.uid() IN (SELECT user_id FROM public.admin_users)
--   );
