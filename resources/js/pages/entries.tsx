import { useMemo, useState } from 'react';
import { Plus, SearchX, ListChecks } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { SearchInput } from '@/components/common/search-input';
import { EntryCard } from '@/components/entries/entry-card';
import { EntryFormDialog } from '@/components/entries/entry-form-dialog';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAppData } from '@/data/store';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { filterAndSortEntries } from '@/lib/entry-query';
import type { EntryFilter, EntrySort } from '@/types';
import { cn } from 'cn';

const filters: { value: EntryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'not-started', label: 'Not started' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'completed', label: 'Completed' },
];

const sortOptions: { value: EntrySort; label: string }[] = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title-asc', label: 'Title A–Z' },
    { value: 'title-desc', label: 'Title Z–A' },
    { value: 'progress-asc', label: 'Progress: low to high' },
    { value: 'progress-desc', label: 'Progress: high to low' },
];

export function EntriesPage() {
    const { entries } = useAppData();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search);
    const [filter, setFilter] = useState<EntryFilter>('all');
    const [sort, setSort] = useState<EntrySort>('newest');
    const [formOpen, setFormOpen] = useState(false);

    const visibleEntries = useMemo(
        () =>
            filterAndSortEntries(entries, {
                search: debouncedSearch,
                filter,
                sort,
            }),
        [entries, debouncedSearch, filter, sort],
    );

    return (
        <>
            <PageHeader
                title="Entries"
                description={
                    entries.length === 0
                        ? 'Track books, courses and anything measured in units.'
                        : `${entries.length} ${
                              entries.length === 1 ? 'entry' : 'entries'
                          } tracked`
                }
                actions={
                    <Button
                        type="button"
                        size="icon"
                        aria-label="New entry"
                        onClick={() => setFormOpen(true)}
                    >
                        <Plus />
                    </Button>
                }
            />

            {entries.length === 0 ? (
                <EmptyState
                    icon={ListChecks}
                    title="No entries yet"
                    description="Create your first entry to start tracking chapters, hours, lessons or anything else you can count."
                    action={
                        <Button onClick={() => setFormOpen(true)}>
                            <Plus />
                            Create entry
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-4">
                    <SearchInput
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Search entries…"
                        aria-label="Search entries"
                    />

                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                        {filters.map((option) => {
                            const active = filter === option.value;

                            return (
                                <Button
                                    key={option.value}
                                    type="button"
                                    size="sm"
                                    variant={active ? 'default' : 'outline'}
                                    aria-pressed={active}
                                    className={cn(
                                        'shrink-0 rounded-full',
                                        !active && 'bg-background',
                                    )}
                                    onClick={() => setFilter(option.value)}
                                >
                                    {option.label}
                                </Button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <p className="text-muted-foreground text-xs">
                            {visibleEntries.length}{' '}
                            {visibleEntries.length === 1 ? 'result' : 'results'}
                        </p>
                        <Select
                            value={sort}
                            onValueChange={(value) => setSort(value as EntrySort)}
                        >
                            <SelectTrigger
                                size="sm"
                                aria-label="Sort entries"
                                className="w-auto gap-1.5"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {visibleEntries.length === 0 ? (
                        <EmptyState
                            icon={SearchX}
                            title="No matching entries"
                            description={
                                debouncedSearch !== ''
                                    ? `Nothing matches “${debouncedSearch}”. Try a different search or filter.`
                                    : 'No entries match this filter.'
                            }
                            action={
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch('');
                                        setFilter('all');
                                    }}
                                >
                                    Clear filters
                                </Button>
                            }
                        />
                    ) : (
                        <div className="space-y-2.5">
                            {visibleEntries.map((entry) => (
                                <EntryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <EntryFormDialog open={formOpen} onOpenChange={setFormOpen} />
        </>
    );
}
