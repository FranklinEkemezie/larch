import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormField } from '@/components/common/form-field';
import { EntryPicker } from '@/components/groups/entry-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import type { Entry, Group } from '@/types';

interface Values {
    name: string;
    entries: string[];
}

export function GroupForm({
    group,
    entries,
    cancelHref,
}: {
    group?: Group;
    entries: Entry[];
    cancelHref: string;
}) {
    const { toast } = useToast();
    const [localError, setLocalError] = useState<string | null>(null);

    const form = useForm<Values>({
        name: group?.name ?? '',
        entries: group?.entries.map((entry) => entry.id) ?? [],
    });

    const toggleEntry = (entryId: string) => {
        form.setData(
            'entries',
            form.data.entries.includes(entryId)
                ? form.data.entries.filter((id) => id !== entryId)
                : [...form.data.entries, entryId],
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (form.data.name.trim() === '') {
            setLocalError('Enter a group name.');
            return;
        }

        setLocalError(null);

        const options = {
            preserveScroll: true,
            onSuccess: () =>
                toast({ title: group ? 'Group updated' : 'Group created' }),
        };

        form.transform((data) => ({
            name: data.name.trim(),
            entries: data.entries,
        }));

        if (group) {
            form.put(routes.groups.update(group.id), options);
            return;
        }

        form.post(routes.groups.store, options);
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormField
                id="group-name"
                label="Name"
                error={localError ?? form.errors.name}
            >
                <Input
                    id="group-name"
                    value={form.data.name}
                    onChange={(event) => {
                        form.setData('name', event.target.value);
                        setLocalError(null);
                    }}
                    placeholder="First semester"
                    autoFocus
                    aria-invalid={Boolean(localError ?? form.errors.name)}
                />
            </FormField>

            <div className="space-y-2">
                <p className="text-sm leading-none font-medium">Entries</p>
                <EntryPicker
                    entries={entries}
                    selected={form.data.entries}
                    onToggle={toggleEntry}
                    emptyMessage="You have no entries yet. The group can stay empty until you create some."
                />
                {form.errors.entries && (
                    <p className="text-destructive text-xs" role="alert">
                        {form.errors.entries}
                    </p>
                )}
            </div>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button asChild variant="outline">
                    <Link href={cancelHref}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {group ? 'Save changes' : 'Create group'}
                </Button>
            </div>
        </form>
    );
}
