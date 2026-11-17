import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import { CheckboxRow } from '@/components/common/checkbox-row';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import { useAppData } from '@/data/store';
import { navigate } from '@/lib/router';
import type { Entry } from '@/types';

interface EntryFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    entry?: Entry;
    initialGroupIds?: string[];
}

interface FormState {
    title: string;
    unit: string;
    total: string;
    completed: string;
    groupIds: string[];
}

type Errors = Partial<Record<'title' | 'unit' | 'total' | 'completed', string>>;

const emptyForm: FormState = {
    title: '',
    unit: '',
    total: '',
    completed: '0',
    groupIds: [],
};

export function EntryFormDialog({
    open,
    onOpenChange,
    entry,
    initialGroupIds = [],
}: EntryFormDialogProps) {
    const {
        groups,
        units,
        createEntry,
        updateEntry,
        entryGroups,
    } = useAppData();
    const { toast } = useToast();

    const [form, setForm] = useState<FormState>(emptyForm);
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        if (!open) {
            return;
        }

        if (entry) {
            setForm({
                title: entry.title,
                unit: entry.unit,
                total: String(entry.total),
                completed: String(entry.completed),
                groupIds: entryGroups(entry.id).map((group) => group.id),
            });
        } else {
            setForm({ ...emptyForm, groupIds: initialGroupIds });
        }

        setErrors({});
        // Reset only when the dialog opens or switches entry.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, entry?.id]);

    const update = <Key extends keyof FormState>(
        key: Key,
        value: FormState[Key],
    ) => setForm((current) => ({ ...current, [key]: value }));

    const toggleGroup = (groupId: string) => {
        setForm((current) => ({
            ...current,
            groupIds: current.groupIds.includes(groupId)
                ? current.groupIds.filter((id) => id !== groupId)
                : [...current.groupIds, groupId],
        }));
    };

    const unitSuggestions = units
        .filter((unit) => unit !== form.unit)
        .filter((unit) =>
            form.unit === ''
                ? true
                : unit.toLowerCase().includes(form.unit.toLowerCase()),
        )
        .slice(0, 4);

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const title = form.title.trim();
        const unit = form.unit.trim();
        const total = Number(form.total);
        const completed = Number(form.completed);
        const nextErrors: Errors = {};

        if (title === '') {
            nextErrors.title = 'Enter a title.';
        }

        if (unit === '') {
            nextErrors.unit = 'Enter a unit, for example Chapters.';
        }

        if (!Number.isInteger(total) || total <= 0) {
            nextErrors.total = 'Total must be a whole number greater than zero.';
        }

        if (!Number.isInteger(completed) || completed < 0) {
            nextErrors.completed = 'Completed must be zero or more.';
        } else if (Number.isInteger(total) && completed > total) {
            nextErrors.completed = `Completed cannot exceed ${total}.`;
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        if (entry) {
            updateEntry(entry.id, {
                title,
                unit,
                total,
                completed,
                groupIds: form.groupIds,
            });
            toast({ title: 'Entry updated', description: title });
            onOpenChange(false);
            return;
        }

        const created = createEntry({
            title,
            unit,
            total,
            completed,
            groupIds: form.groupIds,
        });

        toast({ title: 'Entry created', description: title });
        onOpenChange(false);
        navigate({ name: 'entry', id: created.id });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{entry ? 'Edit entry' : 'New entry'}</DialogTitle>
                    <DialogDescription>
                        {entry
                            ? 'Update the details or move this entry between groups.'
                            : 'Track anything you can measure in units.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="entry-title">Title</Label>
                        <Input
                            id="entry-title"
                            value={form.title}
                            onChange={(event) => update('title', event.target.value)}
                            placeholder="e.g. The Pragmatic Programmer"
                            aria-invalid={Boolean(errors.title)}
                            autoFocus
                        />
                        {errors.title && (
                            <p className="text-destructive text-xs">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="entry-unit">Unit</Label>
                            <Input
                                id="entry-unit"
                                value={form.unit}
                                onChange={(event) => update('unit', event.target.value)}
                                placeholder="Chapters"
                                aria-invalid={Boolean(errors.unit)}
                            />
                            {errors.unit && (
                                <p className="text-destructive text-xs">
                                    {errors.unit}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="entry-total">Total</Label>
                            <Input
                                id="entry-total"
                                type="number"
                                inputMode="numeric"
                                min={1}
                                step={1}
                                value={form.total}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    const parsed = Number(value);

                                    setForm((current) => ({
                                        ...current,
                                        total: value,
                                        completed:
                                            Number.isInteger(parsed) &&
                                            Number(current.completed) > parsed
                                                ? String(parsed)
                                                : current.completed,
                                    }));
                                }}
                                placeholder="20"
                                aria-invalid={Boolean(errors.total)}
                            />
                            {errors.total && (
                                <p className="text-destructive text-xs">
                                    {errors.total}
                                </p>
                            )}
                        </div>
                    </div>

                    {unitSuggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {unitSuggestions.map((unit) => (
                                <button
                                    key={unit}
                                    type="button"
                                    onClick={() => update('unit', unit)}
                                    className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-2.5 py-1 text-xs transition-colors"
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="entry-completed">Completed so far</Label>
                        <Input
                            id="entry-completed"
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={1}
                            value={form.completed}
                            onChange={(event) => update('completed', event.target.value)}
                            aria-invalid={Boolean(errors.completed)}
                        />
                        {errors.completed && (
                            <p className="text-destructive text-xs">
                                {errors.completed}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Groups</Label>
                        {form.groupIds.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {form.groupIds.map((groupId) => {
                                    const group = groups.find(
                                        (item) => item.id === groupId,
                                    );

                                    if (!group) {
                                        return null;
                                    }

                                    return (
                                        <Badge
                                            key={groupId}
                                            variant="secondary"
                                            className="gap-1 pr-1"
                                        >
                                            {group.name}
                                            <button
                                                type="button"
                                                aria-label={`Remove ${group.name}`}
                                                onClick={() => toggleGroup(groupId)}
                                                className="hover:bg-background/60 rounded-full p-0.5"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}

                        {groups.length === 0 ? (
                            <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-3 text-xs">
                                No groups yet. You can create one later.
                            </p>
                        ) : (
                            <div className="max-h-44 space-y-0.5 overflow-y-auto rounded-lg border p-1">
                                {groups.map((group) => (
                                    <CheckboxRow
                                        key={group.id}
                                        id={`entry-group-${group.id}`}
                                        checked={form.groupIds.includes(group.id)}
                                        onCheckedChange={() => toggleGroup(group.id)}
                                        title={group.name}
                                        description={`${group.entryIds.length} ${
                                            group.entryIds.length === 1
                                                ? 'entry'
                                                : 'entries'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {entry ? 'Save changes' : 'Create entry'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
