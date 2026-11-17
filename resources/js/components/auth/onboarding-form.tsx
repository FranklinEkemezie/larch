import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import { cn } from 'cn';

interface Values {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const steps = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password' },
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OnboardingForm() {
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const [stepError, setStepError] = useState<string | null>(null);

    const form = useForm<Values>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const validateStep = (): string | null => {
        if (step === 0 && form.data.name.trim() === '') {
            return 'Enter your name.';
        }

        if (step === 1 && !emailPattern.test(form.data.email)) {
            return 'Enter a valid email address.';
        }

        if (step === 2) {
            if (form.data.password.length < 8) {
                return 'Use at least 8 characters.';
            }

            if (form.data.password !== form.data.password_confirmation) {
                return 'The passwords do not match.';
            }
        }

        return null;
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const error = validateStep();

        if (error) {
            setStepError(error);
            return;
        }

        setStepError(null);

        if (step < steps.length - 1) {
            setStep(step + 1);
            return;
        }

        form.post(routes.auth.signupStore, {
            onSuccess: () => toast({ title: 'Account created' }),
            onError: (errors) => {
                if (errors.name) {
                    setStep(0);
                } else if (errors.email) {
                    setStep(1);
                } else if (errors.password) {
                    setStep(2);
                }
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <ol className="flex items-center gap-2" aria-label="Sign up steps">
                {steps.map((item, index) => {
                    const complete = index < step;
                    const current = index === step;

                    return (
                        <li
                            key={item.key}
                            className="flex flex-1 items-center gap-2"
                        >
                            <span
                                className={cn(
                                    'flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold',
                                    complete &&
                                        'border-primary bg-primary text-primary-foreground',
                                    current &&
                                        !complete &&
                                        'border-primary text-primary',
                                    !complete &&
                                        !current &&
                                        'text-muted-foreground',
                                )}
                                aria-current={current ? 'step' : undefined}
                            >
                                {complete ? (
                                    <Check className="size-3.5" />
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <span
                                className={cn(
                                    'h-1 flex-1 rounded-full',
                                    complete || current
                                        ? 'bg-primary/60'
                                        : 'bg-muted',
                                    index === steps.length - 1 && 'hidden',
                                )}
                            />
                        </li>
                    );
                })}
            </ol>

            {step === 0 && (
                <FormField
                    id="name"
                    label="Your name"
                    error={stepError ?? form.errors.name}
                >
                    <Input
                        id="name"
                        value={form.data.name}
                        onChange={(event) => {
                            form.setData('name', event.target.value);
                            setStepError(null);
                        }}
                        autoComplete="name"
                        autoFocus
                        aria-invalid={Boolean(stepError ?? form.errors.name)}
                    />
                </FormField>
            )}

            {step === 1 && (
                <FormField
                    id="email"
                    label="Your email"
                    error={stepError ?? form.errors.email}
                >
                    <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        value={form.data.email}
                        onChange={(event) => {
                            form.setData('email', event.target.value);
                            setStepError(null);
                        }}
                        autoComplete="email"
                        autoFocus
                        aria-invalid={Boolean(stepError ?? form.errors.email)}
                    />
                </FormField>
            )}

            {step === 2 && (
                <>
                    <FormField
                        id="password"
                        label="Create a password"
                        error={
                            stepError ??
                            form.errors.password ??
                            form.errors.password_confirmation
                        }
                        hint="At least 8 characters."
                    >
                        <Input
                            id="password"
                            type="password"
                            value={form.data.password}
                            onChange={(event) => {
                                form.setData('password', event.target.value);
                                setStepError(null);
                            }}
                            autoComplete="new-password"
                            autoFocus
                            aria-invalid={Boolean(stepError ?? form.errors.password)}
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
                            aria-invalid={Boolean(
                                form.errors.password_confirmation,
                            )}
                        />
                    </FormField>
                </>
            )}

            <div className="flex gap-2">
                {step > 0 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                            setStep(step - 1);
                            setStepError(null);
                        }}
                    >
                        <ArrowLeft />
                        Back
                    </Button>
                )}

                <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    disabled={form.processing}
                >
                    {step === steps.length - 1 ? (
                        'Create account'
                    ) : (
                        <>
                            Continue
                            <ArrowRight />
                        </>
                    )}
                </Button>
            </div>

            {step === 0 && (
                <p className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <Link
                        href={routes.auth.login}
                        className="text-primary font-medium underline-offset-4 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            )}
        </form>
    );
}
