import { useEffect, useMemo, useState } from 'react';
import { CheckboxRow } from '@/components/common/checkbox-row';
import { EmptyState } from '@/components/common/empty-state';
import { SearchInput } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { useAppData } from '@/data/store';
import { ListPlus } from 'lucide-react';
import type { Group } from '@/types';

interface AddEntriesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    group: Group;
}

export function AddEntriesDialog({
    open,
    onOpenChange,
    group,
}: AddEntriesDialogProps) {
    const { entries, addEntriesToGroup } = useAppData();
    const { toast } = useToast();

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (!open) {
            return;
        }

        setSearch('');
        setSelected([]);
    }, [open, group.id]);

    const available = useMemo(
        () => entries.filter((entry) => !group.entryIds.includes(entry.id)),
        [entries, group.entryIds],
    );

    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();

        return available.filter((entry) =>
            needle === '' ? true : entry.title.toLowerCase().includes(needle),
        );
    }, [available, search]);

    const toggleEntry = (entryId: string) => {
        setSelected((current) =>
            current.includes(entryId)
                ? current.filter((id) => id !== entryId)
                : [...current, entryId],
        );
    };

    const apply = () => {
        if (selected.length === 0) {
            return;
        }

        addEntriesToGroup(group.id, selected);
        toast({
            title: `${selected.length} ${
                selected.length === 1 ? 'entry' : 'entries'
            } added`,
            description: group.name,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add entries</DialogTitle>
                    <DialogDescription>
                        Choose existing entries to add to “{group.name}”.
                    </DialogDescription>
                </DialogHeader>

                {available.length === 0 ? (
                    <EmptyState
                        icon={ListPlus}
                        title="Everything is already here"
                        description="All of your entries belong to this group. Create a new entry to add more."
                    />
                ) : (
                    <>
                        <SearchInput
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Search entries…"
                            aria-label="Search entries"
                        />

                        {filtered.length === 0 ? (
                            <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-6 text-center text-sm">
                                No entries match “{search}”.
                            </p>
                        ) : (
                            <div className="max-h-64 space-y-0.5 overflow-y-auto rounded-lg border p-1">
                                {filtered.map((entry) => (
                                    <CheckboxRow
                                        key={entry.id}
                                        id={`add-entry-${entry.id}`}
                                        checked={selected.includes(entry.id)}
                                        onCheckedChange={() => toggleEntry(entry.id)}
                                        title={entry.title}
                                        description={`${entry.completed} / ${entry.total} ${entry.unit}`}
                                    />
                                ))}
                            </div>
                        )}
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
                    <Button
                        type="button"
                        onClick={apply}
                        disabled={selected.length === 0}
                    >
                        {selected.length === 0
                            ? 'Add entries'
                            : `Add ${selected.length} ${
                                  selected.length === 1 ? 'entry' : 'entries'
                              }`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
