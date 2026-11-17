import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ListChecks, Plus, SearchX } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { SearchInput } from '@/components/common/search-input';
import { EntryCard } from '@/components/entries/entry-card';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { filterAndSortEntries } from '@/lib/entry-query';
import { routes } from '@/lib/routes';
import type { EntryFilter, EntryIndexProps, EntrySort } from '@/types';
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

export default function EntriesIndex({ entries }: EntryIndexProps) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search);
    const [filter, setFilter] = useState<EntryFilter>('all');
    const [sort, setSort] = useState<EntrySort>('newest');

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
        <AppLayout>
            <Head title="Entries" />

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
                    <Button asChild size="icon" aria-label="New entry">
                        <Link href={routes.entries.create}>
                            <Plus />
                        </Link>
                    </Button>
                }
            />

            {entries.length === 0 ? (
                <EmptyState
                    icon={ListChecks}
                    title="No entries yet"
                    description="Add the first thing you are working through and keep its progress in one place."
                    action={
                        <Button asChild>
                            <Link href={routes.entries.create}>
                                <Plus />
                                Create entry
                            </Link>
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
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
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
                                    ? `Nothing matches “${debouncedSearch}”.`
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
        </AppLayout>
    );
}
