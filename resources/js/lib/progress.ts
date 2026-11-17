import type { Entry, EntryStatus } from '@/types';

/**
 * Progress is always derived from the stored completed/total values. Nothing
 * in the UI stores a percentage.
 */
export function progressPercent(completed: number, total: number): number {
    if (!Number.isFinite(completed) || !Number.isFinite(total) || total <= 0) {
        return 0;
    }

    return Math.round((completed / total) * 100);
}

export function entryPercent(entry: Pick<Entry, 'completed' | 'total'>): number {
    return progressPercent(entry.completed, entry.total);
}

export function clampCompleted(value: number, total: number): number {
    if (!Number.isFinite(value)) {
        return 0;
    }

    const whole = Math.trunc(value);

    return Math.min(Math.max(whole, 0), Math.max(Math.trunc(total), 0));
}

export function entryStatus(
    entry: Pick<Entry, 'completed' | 'total'>,
): EntryStatus {
    if (entry.completed <= 0) {
        return 'not-started';
    }

    if (entry.completed >= entry.total) {
        return 'completed';
    }

    return 'in-progress';
}

export const statusLabels: Record<EntryStatus, string> = {
    'not-started': 'Not started',
    'in-progress': 'In progress',
    completed: 'Completed',
};

export function isEntryComplete(entry: Pick<Entry, 'completed' | 'total'>): boolean {
    return entryStatus(entry) === 'completed';
}
