import { entryPercent, entryStatus } from '@/lib/progress';
import type { Entry, EntryFilter, EntrySort } from '@/types';

export interface EntryQuery {
    search: string;
    filter: EntryFilter;
    sort: EntrySort;
}

export function matchesSearch(entry: Entry, search: string): boolean {
    const needle = search.trim().toLowerCase();

    if (needle === '') {
        return true;
    }

    return entry.title.toLowerCase().includes(needle);
}

export function filterAndSortEntries(
    entries: Entry[],
    { search, filter, sort }: EntryQuery,
): Entry[] {
    const filtered = entries.filter((entry) => {
        if (!matchesSearch(entry, search)) {
            return false;
        }

        return filter === 'all' || entryStatus(entry) === filter;
    });

    return [...filtered].sort((a, b) => {
        switch (sort) {
            case 'oldest':
                return a.createdAt.localeCompare(b.createdAt);
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            case 'progress-asc':
                return (
                    entryPercent(a) - entryPercent(b) ||
                    a.title.localeCompare(b.title)
                );
            case 'progress-desc':
                return (
                    entryPercent(b) - entryPercent(a) ||
                    a.title.localeCompare(b.title)
                );
            case 'newest':
            default:
                return b.createdAt.localeCompare(a.createdAt);
        }
    });
}
