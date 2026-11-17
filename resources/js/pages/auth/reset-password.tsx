import { Head } from '@inertiajs/react';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { AuthLayout } from '@/layouts/auth-layout';

export default function ResetPassword({
    token = '',
    email = '',
}: {
    token?: string;
    email?: string;
}) {
    return (
        <AuthLayout title="Choose a new password">
            <Head title="Reset password" />
            <ResetPasswordForm token={token} email={email} />
        </AuthLayout>
    );
}
