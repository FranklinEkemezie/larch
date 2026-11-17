import { Link } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { Button } from '@/components/ui/button';
import { useProgressUpdate } from '@/hooks/use-progress-update';
import { routes } from '@/lib/routes';
import { entryPercent, entryStatus } from '@/lib/progress';
import type { Entry } from '@/types';

/** Compact entry row with one-tap progress updates for the home screen. */
export function EntryQuickRow({ entry }: { entry: Entry }) {
    const { value, saving, increment, decrement } = useProgressUpdate(entry);

    return (
        <article className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <Link
                    href={routes.entries.show(entry.id)}
                    className="focus-visible:ring-ring/50 min-w-0 flex-1 rounded-sm focus-visible:ring-[3px] focus-visible:outline-none"
                >
                    <p className="truncate font-medium">{entry.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {value} / {entry.total} {entry.unit}
                    </p>
                </Link>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {entryPercent({ completed: value, total: entry.total })}%
                </span>
            </div>

            <ProgressBar
                value={entryPercent({ completed: value, total: entry.total })}
                className="mt-3"
                label={`${entry.title}: ${entryPercent({ completed: value, total: entry.total })}% complete`}
            />

            <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge
                    status={entryStatus({ completed: value, total: entry.total })}
                />
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Decrease progress for ${entry.title}`}
                        disabled={saving || value <= 0}
                        onClick={decrement}
                    >
                        <Minus />
                    </Button>
                    <Button
                        type="button"
                        size="icon-sm"
                        aria-label={`Increase progress for ${entry.title}`}
                        disabled={saving || value >= entry.total}
                        onClick={increment}
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </article>
    );
}
