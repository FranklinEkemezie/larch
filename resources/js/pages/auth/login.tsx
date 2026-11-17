import { Head } from '@inertiajs/react';
import { LoginForm } from '@/components/auth/login-form';
import { AuthLayout } from '@/layouts/auth-layout';

export default function Login() {
    return (
        <AuthLayout title="Sign in">
            <Head title="Sign in" />
            <LoginForm />
        </AuthLayout>
    );
}
