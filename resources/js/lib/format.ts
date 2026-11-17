export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export function pluralize(
    count: number,
    singular: string,
    plural = `${singular}s`,
): string {
    return `${count} ${count === 1 ? singular : plural}`;
}

export function greeting(date = new Date()): string {
    const hour = date.getHours();

    if (hour < 12) {
        return 'Good morning';
    }

    if (hour < 18) {
        return 'Good afternoon';
    }

    return 'Good evening';
}

export function todayLabel(date = new Date()): string {
    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
}
