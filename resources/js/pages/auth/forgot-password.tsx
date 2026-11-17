import { Head } from '@inertiajs/react';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { AuthLayout } from '@/layouts/auth-layout';

export default function ForgotPassword() {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter the email on your account and we will send a reset link."
        >
            <Head title="Forgot password" />
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
