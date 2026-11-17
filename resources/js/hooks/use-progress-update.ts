import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import { clampCompleted } from '@/lib/progress';
import type { Entry } from '@/types';

/**
 * Progress updates are optimistic: the visible value changes immediately and
 * the server response replaces it. A failed request rolls the value back.
 */
export function useProgressUpdate(entry: Entry) {
    const { toast } = useToast();
    const [value, setValue] = useState(entry.completed);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setValue(entry.completed);
    }, [entry.completed]);

    const update = (next: number) => {
        if (saving) {
            return;
        }

        const clamped = clampCompleted(next, entry.total);

        if (clamped === value) {
            return;
        }

        const previous = value;

        setValue(clamped);
        setSaving(true);

        router.patch(
            routes.entries.update(entry.id),
            { completed: clamped, total: entry.total },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    setValue(previous);
                    toast({ title: 'Progress was not saved' });
                },
                onFinish: () => setSaving(false),
            },
        );
    };

    return {
        value,
        saving,
        update,
        increment: () => update(value + 1),
        decrement: () => update(value - 1),
    };
}
