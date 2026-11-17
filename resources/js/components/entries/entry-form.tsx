import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import type { Entry } from '@/types';

interface Values {
    title: string;
    unit: string;
    total: string;
    completed: string;
}

type FieldErrors = Partial<Record<keyof Values, string>>;

interface EntryFormProps {
    entry?: Entry;
    units?: string[];
    cancelHref: string;
}

export function EntryForm({ entry, units = [], cancelHref }: EntryFormProps) {
    const { toast } = useToast();
    const [localErrors, setLocalErrors] = useState<FieldErrors>({});

    const form = useForm<Values>({
        title: entry?.title ?? '',
        unit: entry?.unit ?? '',
        total: entry ? String(entry.total) : '',
        completed: entry ? String(entry.completed) : '0',
    });

    const validate = (): FieldErrors => {
        const total = Number(form.data.total);
        const completed = Number(form.data.completed);
        const errors: FieldErrors = {};

        if (form.data.title.trim() === '') {
            errors.title = 'Enter a title.';
        }

        if (form.data.unit.trim() === '') {
            errors.unit = 'Enter a unit, for example Chapters.';
        }

        if (!Number.isInteger(total) || total <= 0) {
            errors.total = 'Total must be a whole number greater than zero.';
        }

        if (!Number.isInteger(completed) || completed < 0) {
            errors.completed = 'Completed must be zero or more.';
        } else if (Number.isInteger(total) && completed > total) {
            errors.completed = `Completed cannot exceed ${total}.`;
        }

        return errors;
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const errors = validate();
        setLocalErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const options = {
            preserveScroll: true,
            onSuccess: () =>
                toast({ title: entry ? 'Entry updated' : 'Entry created' }),
        };

        form.transform((data) => ({
            title: data.title.trim(),
            unit: data.unit.trim(),
            total: Number(data.total),
            completed: Number(data.completed),
        }));

        if (entry) {
            form.put(routes.entries.update(entry.id), options);
            return;
        }

        form.post(routes.entries.store, options);
    };

    const errorFor = (field: keyof Values): string | undefined =>
        localErrors[field] ?? form.errors[field];

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormField id="entry-title" label="Title" error={errorFor('title')}>
                <Input
                    id="entry-title"
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData('title', event.target.value)
                    }
                    placeholder="The Pragmatic Programmer"
                    autoFocus
                    aria-invalid={Boolean(errorFor('title'))}
                />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="entry-unit"
                    label="Unit"
                    error={errorFor('unit')}
                >
                    <Input
                        id="entry-unit"
                        value={form.data.unit}
                        onChange={(event) =>
                            form.setData('unit', event.target.value)
                        }
                        placeholder="Chapters"
                        aria-invalid={Boolean(errorFor('unit'))}
                    />
                </FormField>

                <FormField
                    id="entry-total"
                    label="Total"
                    error={errorFor('total')}
                >
                    <Input
                        id="entry-total"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        value={form.data.total}
                        onChange={(event) =>
                            form.setData('total', event.target.value)
                        }
                        placeholder="20"
                        aria-invalid={Boolean(errorFor('total'))}
                    />
                </FormField>
            </div>

            {units.length > 0 && (
                <div className="-mt-2 flex flex-wrap gap-1.5">
                    {units.map((unit) => (
                        <button
                            key={unit}
                            type="button"
                            onClick={() => form.setData('unit', unit)}
                            className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-2.5 py-1 text-xs transition-colors"
                        >
                            {unit}
                        </button>
                    ))}
                </div>
            )}

            <FormField
                id="entry-completed"
                label="Completed so far"
                error={errorFor('completed')}
            >
                <Input
                    id="entry-completed"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    value={form.data.completed}
                    onChange={(event) =>
                        form.setData('completed', event.target.value)
                    }
                    aria-invalid={Boolean(errorFor('completed'))}
                />
            </FormField>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button asChild variant="outline">
                    <Link href={cancelHref}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {entry ? 'Save changes' : 'Create entry'}
                </Button>
            </div>
        </form>
    );
}
