'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Admin authorization check
async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');
    const { data: adminRecord } = await supabase.from('admin_users').select('id').eq('user_id', user.id).single();
    if (!adminRecord) throw new Error('Forbidden: Admin access required');
    return supabase;
}

export async function updateEmailSettings(formData: FormData) {
    const id = formData.get('id') as string;
    const sender_email = formData.get('sender_email') as string;
    const subject = formData.get('subject') as string;
    const body_text = formData.get('body_text') as string;

    const supabase = await requireAdmin();
    const { error } = await supabase
        .from('email_settings')
        .update({ sender_email, subject, body_text, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error('Update setting error:', error);
        return { error: 'Failed to update settings.' };
    }

    revalidatePath('/admin/email-settings');
    return { success: true };
}
