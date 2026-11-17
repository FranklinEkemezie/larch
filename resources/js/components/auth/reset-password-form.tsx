import type { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pendingRoutes } from '@/lib/routes';

interface Values {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export function ResetPasswordForm({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const form = useForm<Values>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(pendingRoutes.resetPassword, {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

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
                    readOnly={email !== ''}
                />
            </FormField>

            <FormField
                id="password"
                label="New password"
                error={form.errors.password}
                hint="At least 8 characters."
            >
                <Input
                    id="password"
                    type="password"
                    value={form.data.password}
                    onChange={(event) =>
                        form.setData('password', event.target.value)
                    }
                    autoComplete="new-password"
                    autoFocus
                    aria-invalid={Boolean(form.errors.password)}
                />
            </FormField>

            <FormField
                id="password_confirmation"
                label="Confirm new password"
                error={form.errors.password_confirmation}
            >
                <Input
                    id="password_confirmation"
                    type="password"
                    value={form.data.password_confirmation}
                    onChange={(event) =>
                        form.setData(
                            'password_confirmation',
                            event.target.value,
                        )
                    }
                    autoComplete="new-password"
                    aria-invalid={Boolean(form.errors.password_confirmation)}
                />
            </FormField>

            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.processing}
            >
                Save new password
            </Button>
        </form>
    );
}
