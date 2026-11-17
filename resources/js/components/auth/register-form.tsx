import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';

interface Values {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export function RegisterForm() {
    const { toast } = useToast();

    const form = useForm<Values>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(routes.auth.signupStore, {
            onSuccess: () => toast({ title: 'Account created' }),
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormField id="name" label="Name" error={form.errors.name}>
                <Input
                    id="name"
                    value={form.data.name}
                    onChange={(event) => form.setData('name', event.target.value)}
                    autoComplete="name"
                    autoFocus
                    aria-invalid={Boolean(form.errors.name)}
                />
            </FormField>

            <FormField id="email" label="Email" error={form.errors.email}>
                <Input
                    id="email"
                    type="email"
                    value={form.data.email}
                    onChange={(event) =>
                        form.setData('email', event.target.value)
                    }
                    autoComplete="email"
                    aria-invalid={Boolean(form.errors.email)}
                />
            </FormField>

            <FormField
                id="password"
                label="Password"
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
                    aria-invalid={Boolean(form.errors.password)}
                />
            </FormField>

            <FormField
                id="password_confirmation"
                label="Confirm password"
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
                Create account
            </Button>

            <p className="text-muted-foreground text-center text-sm">
                Already have an account?{' '}
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
