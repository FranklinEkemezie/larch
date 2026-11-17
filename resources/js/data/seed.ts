import type { AppData, Entry, Group } from '@/types';

function daysAgo(days: number, hour = 9): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(hour, 0, 0, 0);

    return date.toISOString();
}

function entry(
    id: string,
    title: string,
    unit: string,
    completed: number,
    total: number,
    createdDaysAgo: number,
    updatedDaysAgo: number,
): Entry {
    return {
        id,
        title,
        unit,
        completed,
        total,
        createdAt: daysAgo(createdDaysAgo),
        updatedAt: daysAgo(updatedDaysAgo),
    };
}

/**
 * Realistic starter data so every screen, empty state and chart can be
 * reviewed before the Laravel API exists. Replaced by Inertia props later.
 */
export function createSeedData(): AppData {
    const entries: Entry[] = [
        entry(
            'entry-refactoring-ui',
            'Refactoring UI',
            'Chapters',
            12,
            24,
            18,
            1,
        ),
        entry(
            'entry-pragmatic-programmer',
            'The Pragmatic Programmer',
            'Chapters',
            8,
            20,
            24,
            3,
        ),
        entry(
            'entry-cs50',
            'CS50x — Introduction to Computer Science',
            'Lectures',
            6,
            11,
            30,
            2,
        ),
        entry(
            'entry-typescript-patterns',
            'Advanced TypeScript Patterns',
            'Lessons',
            18,
            24,
            12,
            0,
        ),
        entry(
            'entry-larch',
            'Larch — Final Year Project',
            'Features',
            9,
            14,
            35,
            0,
        ),
        entry(
            'entry-ddia',
            'Designing Data-Intensive Applications',
            'Chapters',
            3,
            12,
            9,
            6,
        ),
        entry(
            'entry-spanish',
            'Daily Spanish Practice',
            'Hours',
            26,
            40,
            21,
            4,
        ),
        entry(
            'entry-atomic-habits',
            'Atomic Habits',
            'Chapters',
            20,
            20,
            40,
            12,
        ),
    ];

    const groups: Group[] = [
        {
            id: 'group-final-year',
            name: 'Final Year — First Semester',
            entryIds: [
                'entry-larch',
                'entry-typescript-patterns',
                'entry-ddia',
            ],
            createdAt: daysAgo(30),
            updatedAt: daysAgo(1),
        },
        {
            id: 'group-engineering-reading',
            name: 'Engineering Reading',
            entryIds: [
                'entry-refactoring-ui',
                'entry-pragmatic-programmer',
                'entry-ddia',
                'entry-atomic-habits',
            ],
            createdAt: daysAgo(60),
            updatedAt: daysAgo(3),
        },
        {
            id: 'group-learning-paths',
            name: 'Learning Paths',
            entryIds: [
                'entry-cs50',
                'entry-typescript-patterns',
                'entry-spanish',
            ],
            createdAt: daysAgo(45),
            updatedAt: daysAgo(2),
        },
    ];

    return { entries, groups };
}
