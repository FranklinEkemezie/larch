import { Minus, Plus } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { Button } from '@/components/ui/button';
import { entryPercent, entryStatus } from '@/lib/progress';
import { navigate } from '@/lib/router';
import type { Entry } from '@/types';

interface EntryQuickRowProps {
    entry: Entry;
    onIncrement: () => void;
    onDecrement: () => void;
}

/** Compact row with one-tap progress updates for the home dashboard. */
export function EntryQuickRow({
    entry,
    onIncrement,
    onDecrement,
}: EntryQuickRowProps) {
    const percent = entryPercent(entry);
    const status = entryStatus(entry);

    return (
        <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <button
                    type="button"
                    className="focus-visible:ring-ring/50 min-w-0 flex-1 rounded-sm text-left focus-visible:ring-[3px] focus-visible:outline-none"
                    onClick={() => navigate({ name: 'entry', id: entry.id })}
                >
                    <p className="truncate font-medium">{entry.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {entry.completed} / {entry.total} {entry.unit}
                    </p>
                </button>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {percent}%
                </span>
            </div>

            <ProgressBar
                value={percent}
                className="mt-3"
                label={`${entry.title}: ${percent}% complete`}
            />

            <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge status={status} />
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Decrease progress for ${entry.title}`}
                        disabled={entry.completed <= 0}
                        onClick={onDecrement}
                    >
                        <Minus />
                    </Button>
                    <Button
                        type="button"
                        size="icon-sm"
                        aria-label={`Increase progress for ${entry.title}`}
                        disabled={entry.completed >= entry.total}
                        onClick={onIncrement}
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    );
}
