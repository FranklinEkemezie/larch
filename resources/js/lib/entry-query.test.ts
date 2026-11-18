import { describe, expect, it } from 'vitest';
import { filterAndSortEntries, matchesSearch } from '@/lib/entry-query';
import type { Entry } from '@/types';

function entry(overrides: Partial<Entry> = {}): Entry {
    return {
        id: 'entry-1',
        title: 'Designing Data-Intensive Applications',
        unit: 'Chapters',
        completed: 0,
        total: 12,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        ...overrides,
    };
}

const entries: Entry[] = [
    entry({
        id: 'a',
        title: 'Fluent Python',
        completed: 6,
        total: 12,
        createdAt: '2026-03-01T00:00:00.000Z',
    }),
    entry({
        id: 'b',
        title: 'Laravel Beyond CRUD',
        completed: 0,
        total: 10,
        createdAt: '2026-01-01T00:00:00.000Z',
    }),
    entry({
        id: 'c',
        title: 'Refactoring UI',
        completed: 8,
        total: 8,
        createdAt: '2026-02-01T00:00:00.000Z',
    }),
];

describe('matchesSearch', () => {
    it('matches titles without regard to case or surrounding space', () => {
        expect(matchesSearch(entries[0], '  python ')).toBe(true);
        expect(matchesSearch(entries[0], 'RUST')).toBe(false);
        expect(matchesSearch(entries[0], '')).toBe(true);
    });
});

describe('filterAndSortEntries', () => {
    it('combines the search and status filters', () => {
        const result = filterAndSortEntries(entries, {
            search: 'f',
            filter: 'in-progress',
            sort: 'title-asc',
        });

        expect(result.map((item) => item.id)).toEqual(['a']);
    });

    it('sorts newest first by default', () => {
        const result = filterAndSortEntries(entries, {
            search: '',
            filter: 'all',
            sort: 'newest',
        });

        expect(result.map((item) => item.id)).toEqual(['a', 'c', 'b']);
    });

    it('sorts alphabetically by title', () => {
        const result = filterAndSortEntries(entries, {
            search: '',
            filter: 'all',
            sort: 'title-asc',
        });

        expect(result.map((item) => item.title)).toEqual([
            'Fluent Python',
            'Laravel Beyond CRUD',
            'Refactoring UI',
        ]);
    });

    it('sorts by progress and breaks ties by title', () => {
        const tied = [
            entry({ id: 'x', title: 'Zeta', completed: 5, total: 10 }),
            entry({ id: 'y', title: 'Alpha', completed: 5, total: 10 }),
            entry({ id: 'z', title: 'Beta', completed: 1, total: 10 }),
        ];

        const result = filterAndSortEntries(tied, {
            search: '',
            filter: 'all',
            sort: 'progress-desc',
        });

        expect(result.map((item) => item.id)).toEqual(['y', 'x', 'z']);
    });

    it('does not mutate the source list', () => {
        const source = [
            entry({ id: 'first', createdAt: '2026-01-01T00:00:00.000Z' }),
            entry({ id: 'second', createdAt: '2026-02-01T00:00:00.000Z' }),
        ];

        filterAndSortEntries(source, {
            search: '',
            filter: 'all',
            sort: 'oldest',
        });

        expect(source.map((item) => item.id)).toEqual(['first', 'second']);
    });
});
