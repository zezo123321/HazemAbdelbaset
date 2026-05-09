# Blog Editor

## Overview
The blog editor uses **TipTap** — a headless, extensible rich text editor built on ProseMirror. It replaces the previous textarea-based content input.

## Editor Component
**File**: `src/components/admin/RichTextEditor.tsx`

### Features
- H2, H3 headings
- Bold, italic
- Bullet list, ordered list
- Blockquote
- Links (URL prompt)
- Images (URL prompt)
- Clear formatting
- Dark theme matching admin dashboard

### How It Works
1. The editor initializes with `@tiptap/starter-kit` plus `Link`, `Image`, and `Placeholder` extensions.
2. On every keystroke, it emits three output formats:
   - `html` — rendered HTML string
   - `json` — TipTap JSON document (structured AST)
   - `text` — plain text extraction
3. These values are stored in component refs and injected into `FormData` when the form submits.

### Form Integration
`AdminForm.tsx` supports a `richtext` field type. When a field has `type: 'richtext'`:
- The `RichTextEditor` component is rendered (lazy-loaded to avoid SSR issues)
- On submit, three hidden values are appended to FormData:
  - `content_html` — the HTML output
  - `content_json` — stringified JSON document
  - `content_text` — plain text for search/fallback

## Content Storage

The `blogs` table stores content in multiple formats:

| Column | Type | Purpose |
|--------|------|---------|
| `content` | `text[]` | **Legacy** — backward compat for old blogs |
| `content_html` | `text` | Rendered HTML from TipTap |
| `content_json` | `jsonb` | TipTap JSON AST (for re-editing) |
| `content_text` | `text` | Plain text for search/excerpt |

### Why Multiple Formats?
- `content_json` preserves the editor state for re-editing
- `content_html` enables fast rendering without re-processing
- `content_text` enables full-text search and auto-excerpt
- `content` (text[]) keeps old blog posts working

## Editing Existing Content
When editing a blog post:
1. If `content_json` exists, it's loaded into TipTap for WYSIWYG editing
2. If only `content_html` exists (fallback), TipTap parses it
3. If neither exists, the editor starts empty

## Packages
- `@tiptap/react` — React binding
- `@tiptap/starter-kit` — Core extensions (headings, bold, italic, lists, etc.)
- `@tiptap/extension-link` — Link support
- `@tiptap/extension-image` — Image support
- `@tiptap/extension-placeholder` — Empty state placeholder
