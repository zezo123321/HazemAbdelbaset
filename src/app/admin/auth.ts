import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

type SupabaseErrorLike = {
    message?: string;
    code?: string;
    details?: string;
    hint?: string;
};

export function formatSupabaseError(error: SupabaseErrorLike | null) {
    if (!error) return null;

    return {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
    };
}

export async function getAdminContext() {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            supabase,
            user: null,
            isAdmin: false,
            adminCheckError: userError,
        };
    }

    const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin', {
        check_user_id: user.id,
    });

    return {
        supabase,
        user,
        isAdmin: Boolean(isAdmin),
        adminCheckError,
    };
}

export async function requireAdminPage() {
    const context = await getAdminContext();

    if (!context.user) {
        redirect('/login');
    }

    return context;
}
