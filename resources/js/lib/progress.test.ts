import { describe, expect, it } from 'vitest';
import {
    clampCompleted,
    entryPercent,
    entryStatus,
    isEntryComplete,
    progressPercent,
} from '@/lib/progress';

describe('progressPercent', () => {
    it('rounds the completed share to a whole percentage', () => {
        expect(progressPercent(0, 10)).toBe(0);
        expect(progressPercent(1, 3)).toBe(33);
        expect(progressPercent(5, 8)).toBe(63);
        expect(progressPercent(10, 10)).toBe(100);
    });

    it('returns zero when the total is not usable', () => {
        expect(progressPercent(4, 0)).toBe(0);
        expect(progressPercent(4, -10)).toBe(0);
        expect(progressPercent(Number.NaN, 10)).toBe(0);
        expect(progressPercent(4, Number.POSITIVE_INFINITY)).toBe(0);
    });

    it('derives the percentage from an entry', () => {
        expect(entryPercent({ completed: 12, total: 20 })).toBe(60);
    });
});

describe('clampCompleted', () => {
    it('keeps completed within zero and the total', () => {
        expect(clampCompleted(-4, 20)).toBe(0);
        expect(clampCompleted(8, 20)).toBe(8);
        expect(clampCompleted(24, 20)).toBe(20);
    });

    it('drops fractional units', () => {
        expect(clampCompleted(7.8, 20)).toBe(7);
    });

    it('handles invalid values', () => {
        expect(clampCompleted(Number.NaN, 20)).toBe(0);
        expect(clampCompleted(5, -20)).toBe(0);
    });
});

describe('entryStatus', () => {
    it('classifies an entry by its completed value', () => {
        expect(entryStatus({ completed: 0, total: 12 })).toBe('not-started');
        expect(entryStatus({ completed: 6, total: 12 })).toBe('in-progress');
        expect(entryStatus({ completed: 12, total: 12 })).toBe('completed');
    });

    it('recognises completed entries', () => {
        expect(isEntryComplete({ completed: 12, total: 12 })).toBe(true);
        expect(isEntryComplete({ completed: 11, total: 12 })).toBe(false);
    });
});
