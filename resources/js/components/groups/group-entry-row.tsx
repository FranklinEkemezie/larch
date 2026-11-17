import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { entryPercent, entryStatus } from '@/lib/progress';
import type { Entry } from '@/types';

interface GroupEntryRowProps {
    entry: Entry;
    onRemove: () => void;
    removing?: boolean;
}

export function GroupEntryRow({
    entry,
    onRemove,
    removing = false,
}: GroupEntryRowProps) {
    const percent = entryPercent(entry);

    return (
        <div className="bg-card rounded-xl border p-3.5">
            <div className="flex items-start justify-between gap-3">
                <Link
                    href={routes.entries.show(entry.id)}
                    className="focus-visible:ring-ring/50 min-w-0 flex-1 rounded-sm focus-visible:ring-[3px] focus-visible:outline-none"
                >
                    <p className="truncate text-sm font-medium">{entry.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {entry.completed} / {entry.total} {entry.unit}
                    </p>
                </Link>

                <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">
                        {percent}%
                    </span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${entry.title} from this group`}
                        disabled={removing}
                        onClick={onRemove}
                    >
                        <X />
                    </Button>
                </div>
            </div>

            <ProgressBar
                value={percent}
                className="mt-2.5"
                label={`${entry.title}: ${percent}% complete`}
            />

            <div className="mt-2">
                <StatusBadge status={entryStatus(entry)} />
            </div>
        </div>
    );
}
