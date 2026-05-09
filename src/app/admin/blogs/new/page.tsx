import AdminForm, { FieldConfig } from '@/components/admin/AdminForm';
import { saveBlog } from '../../actions';

const blogFields: FieldConfig[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug (URL friendly)', type: 'text', required: true, helperText: 'Lowercase with hyphens only, e.g. my-blog-post' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, helperText: 'Short summary shown in blog cards and SEO descriptions.' },
    { name: 'image', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. AI, Marketing, Development' },
    { name: 'tags', label: 'Tags', type: 'textarea', helperText: 'One tag per line.' },
    { name: 'content', label: 'Blog Content', type: 'richtext', required: true },
    { name: 'publish_date', label: 'Publish Date', type: 'date' },
    { name: 'published', label: 'Published', type: 'checkbox' },
    { name: 'seo_title', label: 'SEO Title', type: 'text', helperText: 'Optional. Overrides the blog title in search results.' },
    { name: 'seo_description', label: 'SEO Description', type: 'textarea', helperText: 'Optional. Custom meta description for search engines.' },
];

export default function NewBlogPage() {
    return (
        <AdminForm
            title="Create New Blog Post"
            action={saveBlog}
            fields={blogFields}
            backLink="/admin/blogs"
        />
    );
}
