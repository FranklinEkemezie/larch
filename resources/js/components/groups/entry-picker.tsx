import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { CheckboxRow } from '@/components/common/checkbox-row';
import { SearchInput } from '@/components/common/search-input';
import { Badge } from '@/components/ui/badge';
import type { Entry } from '@/types';

interface EntryPickerProps {
    entries: Entry[];
    selected: string[];
    onToggle: (entryId: string) => void;
    emptyMessage: string;
}

export function EntryPicker({
    entries,
    selected,
    onToggle,
    emptyMessage,
}: EntryPickerProps) {
    const [search, setSearch] = useState('');

    const byId = useMemo(
        () => new Map(entries.map((entry) => [entry.id, entry])),
        [entries],
    );

    const visible = useMemo(() => {
        const needle = search.trim().toLowerCase();

        return entries.filter((entry) =>
            needle === '' ? true : entry.title.toLowerCase().includes(needle),
        );
    }, [entries, search]);

    if (entries.length === 0) {
        return (
            <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-3 text-xs">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="space-y-2">
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {selected.map((entryId) => {
                        const entry = byId.get(entryId);

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
                                    onClick={() => onToggle(entryId)}
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

            {visible.length === 0 ? (
                <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-6 text-center text-sm">
                    No entries match “{search}”.
                </p>
            ) : (
                <div className="max-h-56 space-y-0.5 overflow-y-auto rounded-lg border p-1">
                    {visible.map((entry) => (
                        <CheckboxRow
                            key={entry.id}
                            id={`entry-picker-${entry.id}`}
                            checked={selected.includes(entry.id)}
                            onCheckedChange={() => onToggle(entry.id)}
                            title={entry.title}
                            description={`${entry.completed} / ${entry.total} ${entry.unit}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
