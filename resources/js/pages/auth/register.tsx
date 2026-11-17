import { Head } from '@inertiajs/react';
import { OnboardingForm } from '@/components/auth/onboarding-form';
import { RegisterForm } from '@/components/auth/register-form';
import { isNativeApp } from '@/lib/platform';
import { AuthLayout } from '@/layouts/auth-layout';

export default function Register() {
    const native = isNativeApp();

    return (
        <AuthLayout
            title={native ? 'Set up Larch' : 'Create your account'}
            description={
                native
                    ? 'Your tracker stays on this device.'
                    : undefined
            }
        >
            <Head title="Create account" />
            {native ? <OnboardingForm /> : <RegisterForm />}
        </AuthLayout>
    );
}
