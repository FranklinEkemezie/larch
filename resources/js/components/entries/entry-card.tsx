import { ChevronRight } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { entryPercent, entryStatus } from '@/lib/progress';
import { navigate } from '@/lib/router';
import type { Entry } from '@/types';

export function EntryCard({ entry }: { entry: Entry }) {
    const percent = entryPercent(entry);
    const status = entryStatus(entry);

    return (
        <button
            type="button"
            onClick={() => navigate({ name: 'entry', id: entry.id })}
            className="bg-card hover:border-primary/30 focus-visible:ring-ring/50 group w-full rounded-xl border p-4 text-left shadow-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate font-medium">{entry.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {entry.completed} / {entry.total} {entry.unit}
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <span className="text-sm font-semibold tabular-nums">
                        {percent}%
                    </span>
                    <ChevronRight className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
            </div>

            <ProgressBar value={percent} className="mt-3" label={`${entry.title}: ${percent}% complete`} />

            <div className="mt-2.5 flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="text-muted-foreground text-xs tabular-nums">
                    {entry.completed === entry.total
                        ? 'All units complete'
                        : `${entry.total - entry.completed} ${entry.unit.toLowerCase()} left`}
                </span>
            </div>
        </button>
    );
}
