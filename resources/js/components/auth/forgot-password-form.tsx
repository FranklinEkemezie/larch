import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pendingRoutes, routes } from '@/lib/routes';

export function ForgotPasswordForm() {
    const form = useForm({ email: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(pendingRoutes.forgotPassword);
    };

    if (form.wasSuccessful) {
        return (
            <div className="space-y-5">
                <p className="text-muted-foreground text-sm">
                    If an account matches that email, a reset link is on its
                    way. Check your inbox and spam folder.
                </p>
                <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href={routes.auth.login}>Back to sign in</Link>
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormField id="email" label="Email" error={form.errors.email}>
                <Input
                    id="email"
                    type="email"
                    value={form.data.email}
                    onChange={(event) =>
                        form.setData('email', event.target.value)
                    }
                    autoComplete="email"
                    autoFocus
                    aria-invalid={Boolean(form.errors.email)}
                />
            </FormField>

            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.processing}
            >
                Send reset link
            </Button>

            <p className="text-muted-foreground text-center text-sm">
                Remembered it?{' '}
                <Link
                    href={routes.auth.login}
                    className="text-primary font-medium underline-offset-4 hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}
