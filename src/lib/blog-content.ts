/**
 * Blog Content Utilities
 *
 * Handles normalization, sanitization, and backward compatibility
 * between old text[] content and new rich HTML content.
 */

// ═══════════════════════════════════════════════════════════════
// CONTENT NORMALIZATION
// ═══════════════════════════════════════════════════════════════

interface BlogContentData {
    content_html?: string | null;
    content_json?: any;
    content_text?: string | null;
    content?: string[];           // old text[] field
}

interface NormalizedContent {
    html: string;
    text: string;
    isLegacy: boolean;
}

/**
 * Normalizes blog content from any format into a unified output.
 * Priority: content_html > content (text[]) > content_text
 */
export function normalizeBlogContent(post: BlogContentData): NormalizedContent {
    // New rich content — use content_html directly
    if (post.content_html?.trim()) {
        return {
            html: post.content_html,
            text: post.content_text || stripHtmlTags(post.content_html),
            isLegacy: false,
        };
    }

    // Legacy text[] content — convert paragraphs to HTML
    if (post.content && Array.isArray(post.content) && post.content.length > 0) {
        const html = post.content
            .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
            .join('\n');
        const text = post.content.join('\n');
        return { html, text, isLegacy: true };
    }

    // Fallback: plain text
    if (post.content_text?.trim()) {
        const html = post.content_text
            .split('\n')
            .filter(Boolean)
            .map(p => `<p>${escapeHtml(p)}</p>`)
            .join('\n');
        return { html, text: post.content_text, isLegacy: true };
    }

    return { html: '', text: '', isLegacy: true };
}

// ═══════════════════════════════════════════════════════════════
// TEXT EXTRACTION
// ═══════════════════════════════════════════════════════════════

/**
 * Extracts plain text from HTML content by stripping all tags.
 */
export function stripHtmlTags(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Extracts plain text from blog content in any format.
 */
export function extractPlainText(post: BlogContentData): string {
    if (post.content_text?.trim()) return post.content_text;
    if (post.content_html?.trim()) return stripHtmlTags(post.content_html);
    if (post.content && Array.isArray(post.content)) return post.content.join('\n');
    return '';
}

// ═══════════════════════════════════════════════════════════════
// EXCERPT GENERATION
// ═══════════════════════════════════════════════════════════════

/**
 * Generates an excerpt from content if no explicit excerpt exists.
 */
export function generateExcerpt(post: BlogContentData, maxLength: number = 160): string {
    const text = extractPlainText(post);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// ═══════════════════════════════════════════════════════════════
// HEADING EXTRACTION (for Table of Contents)
// ═══════════════════════════════════════════════════════════════

interface Heading {
    level: number;
    text: string;
    id: string;
}

/**
 * Extracts h2/h3 headings from HTML content for TOC generation.
 */
export function extractHeadings(html: string): Heading[] {
    const headings: Heading[] = [];
    const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const text = stripHtmlTags(match[2]);
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        headings.push({ level: parseInt(match[1]), text, id });
    }
    return headings;
}

/**
 * Adds id attributes to headings in HTML for anchor navigation.
 */
export function addHeadingIds(html: string): string {
    return html.replace(/<h([23])([^>]*)>(.*?)<\/h([23])>/gi, (match, level, attrs, content) => {
        const text = stripHtmlTags(content);
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    });
}

// ═══════════════════════════════════════════════════════════════
// WORD COUNT
// ═══════════════════════════════════════════════════════════════

/**
 * Calculates word count from any blog content format.
 */
export function getWordCount(post: BlogContentData): number {
    const text = extractPlainText(post);
    return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Estimates reading time in minutes.
 */
export function getReadTime(post: BlogContentData): number {
    return Math.max(1, Math.ceil(getWordCount(post) / 200));
}

// ═══════════════════════════════════════════════════════════════
// INTERNAL HELPERS
// ═══════════════════════════════════════════════════════════════

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
