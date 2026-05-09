'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useRef } from 'react';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
    /** Initial TipTap JSON content for editing */
    initialContent?: any;
    /** Initial HTML string fallback (used when no JSON exists) */
    initialHtml?: string;
    /** Called on every content change with html, json, and plaintext */
    onChange?: (data: { html: string; json: any; text: string }) => void;
    /** Placeholder text shown when editor is empty */
    placeholder?: string;
}

// ═══════════════════════════════════════════════════════════════
// TOOLBAR BUTTON
// ═══════════════════════════════════════════════════════════════

function ToolbarButton({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${styles.toolbarBtn} ${isActive ? styles.toolbarBtnActive : ''}`}
            title={title}
        >
            {children}
        </button>
    );
}

// ═══════════════════════════════════════════════════════════════
// TOOLBAR
// ═══════════════════════════════════════════════════════════════

function Toolbar({ editor }: { editor: any }) {
    if (!editor) return null;

    const addLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previousUrl || 'https://');
        if (url === null) return; // cancelled
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (!url) return;
        editor.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbarGroup}>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    H3
                </ToolbarButton>
            </div>

            <div className={styles.toolbarDivider} />

            <div className={styles.toolbarGroup}>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                >
                    <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                >
                    <em>I</em>
                </ToolbarButton>
            </div>

            <div className={styles.toolbarDivider} />

            <div className={styles.toolbarGroup}>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    • List
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Ordered List"
                >
                    1. List
                </ToolbarButton>
            </div>

            <div className={styles.toolbarDivider} />

            <div className={styles.toolbarGroup}>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Blockquote"
                >
                    &ldquo; Quote
                </ToolbarButton>
                <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive('link')}
                    title="Insert Link"
                >
                    🔗 Link
                </ToolbarButton>
                <ToolbarButton
                    onClick={addImage}
                    title="Insert Image URL"
                >
                    🖼 Image
                </ToolbarButton>
            </div>

            <div className={styles.toolbarDivider} />

            <div className={styles.toolbarGroup}>
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    title="Clear Formatting"
                >
                    ✕ Clear
                </ToolbarButton>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// RICH TEXT EDITOR
// ═══════════════════════════════════════════════════════════════

export default function RichTextEditor({
    initialContent,
    initialHtml,
    onChange,
    placeholder = 'Start writing your blog post...',
}: RichTextEditorProps) {
    const isInitialized = useRef(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    loading: 'lazy',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: initialContent || initialHtml || '',
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
        },
        onUpdate: ({ editor }) => {
            if (!isInitialized.current) return;
            onChange?.({
                html: editor.getHTML(),
                json: editor.getJSON(),
                text: editor.getText(),
            });
        },
    });

    // Mark as initialized after first render to avoid firing onChange on mount
    useEffect(() => {
        if (editor && !isInitialized.current) {
            isInitialized.current = true;
            // Fire initial values
            onChange?.({
                html: editor.getHTML(),
                json: editor.getJSON(),
                text: editor.getText(),
            });
        }
    }, [editor, onChange]);

    return (
        <div className={styles.editorWrapper}>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className={styles.editorContainer} />
        </div>
    );
}
