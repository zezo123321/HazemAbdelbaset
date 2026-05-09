import AdminTable from '@/components/admin/AdminTable';
import { deleteProject } from '../actions';
import { formatSupabaseError, requireAdminPage } from '../auth';
import { createAdminClient } from '@/utils/supabase/admin';

export const revalidate = 0; // Ensure fresh data on every load

export default async function AdminProjectsPage() {
    const { user, isAdmin, adminCheckError } = await requireAdminPage();

    console.info('Admin projects auth debug:', {
        hasSession: Boolean(user),
        userId: user?.id,
        existsInAdminUsers: isAdmin,
        adminCheckError: formatSupabaseError(adminCheckError),
    });

    if (!isAdmin) {
        return (
            <div>
                <h1>Admin access required</h1>
                <p>Your account is signed in, but it is not listed as an admin user.</p>
            </div>
        );
    }

    const adminSupabase = createAdminClient();

    const { data: projects, error } = await adminSupabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn('Error fetching projects:', formatSupabaseError(error));
    }

    return (
        <AdminTable
            title="Projects"
            description="Manage your portfolio projects. Changes will reflect instantly on the Live site."
            items={projects || []}
            baseRoute="/admin/projects"
            onDelete={deleteProject}
        />
    );
}
