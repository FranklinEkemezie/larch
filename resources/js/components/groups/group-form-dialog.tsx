import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import { CheckboxRow } from '@/components/common/checkbox-row';
import { SearchInput } from '@/components/common/search-input';
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
import type { Group } from '@/types';

interface GroupFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    group?: Group;
}

export function GroupFormDialog({
    open,
    onOpenChange,
    group,
}: GroupFormDialogProps) {
    const { entries, createGroup, renameGroup } = useAppData();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        setName(group?.name ?? '');
        setSearch('');
        setSelected([]);
        setError(null);
    }, [open, group?.id]);

    const filteredEntries = useMemo(() => {
        const needle = search.trim().toLowerCase();

        return entries.filter((entry) =>
            needle === '' ? true : entry.title.toLowerCase().includes(needle),
        );
    }, [entries, search]);

    const toggleEntry = (entryId: string) => {
        setSelected((current) =>
            current.includes(entryId)
                ? current.filter((id) => id !== entryId)
                : [...current, entryId],
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (name.trim() === '') {
            setError('Enter a group name.');
            return;
        }

        if (group) {
            renameGroup(group.id, name);
            toast({ title: 'Group renamed', description: name.trim() });
            onOpenChange(false);
            return;
        }

        const created = createGroup({ name, entryIds: selected });

        toast({ title: 'Group created', description: created.name });
        onOpenChange(false);
        navigate({ name: 'group', id: created.id });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{group ? 'Rename group' : 'New group'}</DialogTitle>
                    <DialogDescription>
                        {group
                            ? 'Only the name changes. Entries stay in the group.'
                            : 'Group related entries without duplicating their progress.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="group-name">Name</Label>
                        <Input
                            id="group-name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setError(null);
                            }}
                            placeholder="e.g. Engineering Reading"
                            aria-invalid={error !== null}
                            autoFocus
                        />
                        {error && (
                            <p className="text-destructive text-xs">{error}</p>
                        )}
                    </div>

                    {!group && (
                        <>
                            <div className="space-y-2">
                                <Label>Entries</Label>
                                {selected.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {selected.map((entryId) => {
                                            const entry = entries.find(
                                                (item) => item.id === entryId,
                                            );

                                            if (!entry) {
                                                return null;
                                            }

                                            return (
                                                <Badge
                                                    key={entryId}
                                                    variant="secondary"
                                                    className="gap-1 pr-1"
                                                >
                                                    {entry.title}
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${entry.title}`}
                                                        onClick={() => toggleEntry(entryId)}
                                                        className="hover:bg-background/60 rounded-full p-0.5"
                                                    >
                                                        <X className="size-3" />
                                                    </button>
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                )}

                                <SearchInput
                                    value={search}
                                    onValueChange={setSearch}
                                    placeholder="Search entries…"
                                    aria-label="Search entries"
                                />

                                {entries.length === 0 ? (
                                    <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-3 text-xs">
                                        No entries yet. Create the group now and add
                                        entries later.
                                    </p>
                                ) : filteredEntries.length === 0 ? (
                                    <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-3 text-xs">
                                        No entries match “{search}”.
                                    </p>
                                ) : (
                                    <div className="max-h-48 space-y-0.5 overflow-y-auto rounded-lg border p-1">
                                        {filteredEntries.map((entry) => (
                                            <CheckboxRow
                                                key={entry.id}
                                                id={`group-entry-${entry.id}`}
                                                checked={selected.includes(entry.id)}
                                                onCheckedChange={() => toggleEntry(entry.id)}
                                                title={entry.title}
                                                description={`${entry.completed} / ${entry.total} ${entry.unit}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {group ? 'Save name' : 'Create group'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
