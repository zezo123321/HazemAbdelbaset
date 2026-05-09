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


export type BookingProfile = {
    name: string;
    welcome_message: string;
    language: string;
    date_format: string;
    time_format: string;
    timezone: string;
    avatar_url: string;
}

const DEFAULT_PROFILE: BookingProfile = {
    name: 'Hazem Abdelbaset',
    welcome_message: 'A focused 20–30 minute call to understand your brand, the visual problem, and what kind of system it needs.',
    language: 'en',
    date_format: 'MMM d, yyyy',
    time_format: '12h',
    timezone: 'Africa/Cairo',
    avatar_url: '/avatar.jpg',
};

export async function getBookingProfile(): Promise<BookingProfile> {
    const supabase = await createClient();
    const { data } = await supabase.from('settings').select('value').eq('key', 'booking_profile').single();
    if (data?.value) {
        return { ...DEFAULT_PROFILE, ...(typeof data.value === 'string' ? JSON.parse(data.value) : data.value) };
    }
    return DEFAULT_PROFILE;
}

export async function updateBookingProfile(formData: FormData) {
    const supabase = await requireAdmin();

    const profile: BookingProfile = {
        name: formData.get('name') as string || DEFAULT_PROFILE.name,
        welcome_message: formData.get('welcome_message') as string || DEFAULT_PROFILE.welcome_message,
        language: formData.get('language') as string || 'en',
        date_format: formData.get('date_format') as string || 'MMM d, yyyy',
        time_format: formData.get('time_format') as string || '12h',
        timezone: formData.get('timezone') as string || 'Africa/Cairo',
        avatar_url: formData.get('avatar_url') as string || '/avatar.jpg',
    };

    const { error } = await supabase.from('settings').upsert({
        key: 'booking_profile',
        value: profile,
        updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

    if (error) return { error: error.message };
    revalidatePath('/admin/booking-profile');
    revalidatePath('/book');
    return { success: true };
}
