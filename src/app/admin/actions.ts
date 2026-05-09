'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

// ═══════════════════════════════════════════════════════════════
// AUTH & ADMIN VERIFICATION
// ═══════════════════════════════════════════════════════════════

/**
 * Verifies the current user is authenticated AND is an admin.
 * Checks the admin_users table — being authenticated alone is not enough.
 */
async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Check admin_users through the SECURITY DEFINER helper to avoid RLS recursion.
    const { data: isAdmin, error } = await supabase.rpc('is_admin', {
        check_user_id: user.id,
    });

    if (error || !isAdmin) throw new Error("Forbidden: Admin access required");

    return { supabase: createAdminClient(), user };
}

// Utility to parse array fields from newline separated strings
function parseArray(val: string | null): string[] {
    if (!val) return [];
    return val.split('\n').map(s => s.trim()).filter(Boolean);
}

// Slug validation: lowercase alphanumeric and hyphens only
function isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function toValidSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function isValidImageSource(value: string): boolean {
    return value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://');
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════

export async function saveProject(formData: FormData) {
    const { supabase } = await requireAdmin();

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const long_description = formData.get('long_description') as string;
    const image = formData.get('image') as string;
    const color = formData.get('color') as string;
    const published = formData.get('published') === 'true';

    const tools = parseArray(formData.get('tools') as string);
    const results = parseArray(formData.get('results') as string);

    const payload = { title, slug, category, description, long_description, image, color, tools, results, published };

    let error;
    if (id) {
        ({ error } = await supabase.from('projects').update(payload).eq('id', id));
    } else {
        ({ error } = await supabase.from('projects').insert([payload]));
    }

    if (error) return { error: error.message };

    revalidatePath('/admin/projects');
    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${slug}`);
    return { success: true };
}

export async function deleteProject(id: string) {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/projects');
    revalidatePath('/portfolio');
    return { success: true };
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDIES
// ═══════════════════════════════════════════════════════════════

export async function saveCaseStudy(formData: FormData) {
    const { supabase } = await requireAdmin();

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const rawSlug = formData.get('slug') as string;
    const slug = toValidSlug(rawSlug || title);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;
    const challenge = formData.get('challenge') as string;
    const solution = formData.get('solution') as string;
    const published = formData.get('published') === 'true';

    const results = parseArray(formData.get('results') as string);

    if (!slug) return { error: 'Slug is required. Use letters, numbers, or hyphens.' };
    if (image && !isValidImageSource(image)) {
        return { error: 'Image URL must start with /, http://, or https://.' };
    }

    const payload = { title, slug, category, description, image, challenge, solution, results, published };

    let error;
    if (id) {
        ({ error } = await supabase.from('case_studies').update(payload).eq('id', id));
    } else {
        ({ error } = await supabase.from('case_studies').insert([payload]));
    }

    if (error) return { error: error.message };

    revalidatePath('/admin/case-studies');
    revalidatePath('/case-studies');
    revalidatePath(`/case-studies/${slug}`);
    revalidatePath('/portfolio');
    return { success: true };
}

export async function deleteCaseStudy(id: string) {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/case-studies');
    revalidatePath('/case-studies');
    revalidatePath('/portfolio');
    return { success: true };
}

// ═══════════════════════════════════════════════════════════════
// BLOGS — Enhanced with rich content support
// ═══════════════════════════════════════════════════════════════

export async function saveBlog(formData: FormData) {
    const { supabase, user } = await requireAdmin();

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const image = formData.get('image') as string;
    const publish_date = formData.get('publish_date') as string || new Date().toISOString();
    const published = formData.get('published') === 'true';

    // New rich content fields
    const content_html = formData.get('content_html') as string || '';
    const content_json_raw = formData.get('content_json') as string || '';
    const content_text = formData.get('content_text') as string || '';

    // New metadata fields
    const category = formData.get('category') as string || null;
    const tags = parseArray(formData.get('tags') as string);
    const seo_title = formData.get('seo_title') as string || null;
    const seo_description = formData.get('seo_description') as string || null;

    // ── Validation ──────────────────────────────────────────
    if (!title?.trim()) return { error: 'Title is required.' };
    if (!slug?.trim()) return { error: 'Slug is required.' };
    if (!isValidSlug(slug)) return { error: 'Slug must be lowercase with hyphens only (e.g. my-blog-post).' };

    // Published blogs must have content
    if (published && !content_html?.trim() && !content_text?.trim()) {
        return { error: 'Published blogs must have content.' };
    }

    // Parse content_json safely
    let content_json = null;
    if (content_json_raw) {
        try {
            content_json = JSON.parse(content_json_raw);
        } catch {
            // If JSON parse fails, continue without it
        }
    }

    // Backward compatibility: generate old content text[] from content_text
    const content = content_text
        ? content_text.split('\n').map((s: string) => s.trim()).filter(Boolean)
        : [];

    // Determine status
    const status = published ? 'published' : 'draft';
    const published_at = published ? new Date().toISOString() : null;

    const payload: Record<string, any> = {
        title,
        slug,
        excerpt,
        image,
        content,           // backward compat text[]
        content_html,
        content_json,
        content_text,
        category,
        tags,
        status,
        published,
        seo_title,
        seo_description,
        author_id: user.id,
        publish_date,
        published_at: published ? published_at : undefined,
    };

    let error;
    if (id) {
        // On update, don't overwrite published_at if already set and still published
        if (published) {
            // Keep existing published_at if re-saving a published post
            delete payload.published_at;
        }
        ({ error } = await supabase.from('blogs').update(payload).eq('id', id));
    } else {
        ({ error } = await supabase.from('blogs').insert([payload]));
    }

    if (error) return { error: error.message };

    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
}

export async function deleteBlog(id: string) {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
    return { success: true };
}
