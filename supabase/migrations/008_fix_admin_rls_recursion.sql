-- 008 - Fix admin RLS checks that queried admin_users directly.
-- Direct admin_users subqueries inside policies can recurse through
-- admin_users RLS and block valid admins from reading admin content.

CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = check_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP POLICY IF EXISTS "Admins can read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin_users" ON public.admin_users;

CREATE POLICY "Admins can read admin_users" ON public.admin_users
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage admin_users" ON public.admin_users
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins full access on blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins full access on projects" ON public.projects;
DROP POLICY IF EXISTS "Admins full access on case_studies" ON public.case_studies;

CREATE POLICY "Admins full access on blogs" ON public.blogs
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins full access on projects" ON public.projects
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins full access on case_studies" ON public.case_studies
    FOR ALL USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));
