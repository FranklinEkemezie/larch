import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pendingRoutes, routes } from '@/lib/routes';

interface Values {
    email: string;
    password: string;
    remember_me: boolean;
}

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<Values>({
        email: '',
        password: '',
        remember_me: false,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(routes.auth.loginStore, {
            onFinish: () => form.reset('password'),
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
                    autoFocus
                    aria-invalid={Boolean(form.errors.email)}
                />
            </FormField>

            <FormField
                id="password"
                label="Password"
                error={form.errors.password}
            >
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.data.password}
                        onChange={(event) =>
                            form.setData('password', event.target.value)
                        }
                        autoComplete="current-password"
                        className="pr-16"
                        aria-invalid={Boolean(form.errors.password)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium transition-colors"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </FormField>

            <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor="remember_me"
                    className="flex cursor-pointer items-center gap-2 text-sm"
                >
                    <Checkbox
                        id="remember_me"
                        checked={form.data.remember_me}
                        onCheckedChange={(checked) =>
                            form.setData('remember_me', checked === true)
                        }
                    />
                    Remember me
                </label>

                <Link
                    href={pendingRoutes.forgotPassword}
                    className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.processing}
            >
                Sign in
            </Button>

            <p className="text-muted-foreground text-center text-sm">
                New to Larch?{' '}
                <Link
                    href={routes.auth.signup}
                    className="text-primary font-medium underline-offset-4 hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </form>
    );
}
