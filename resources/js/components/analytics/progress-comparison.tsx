import { Check, Info } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { entryPercent, isEntryComplete } from '@/lib/progress';
import { navigate } from '@/lib/router';
import type { Entry } from '@/types';

/**
 * Horizontal comparison built from shadcn Progress bars. Percentages are used
 * because entries can measure different units. A single aggregate score is
 * intentionally never shown.
 */
export function ProgressComparison({ entries }: { entries: Entry[] }) {
    const sorted = [...entries].sort(
        (a, b) => entryPercent(b) - entryPercent(a),
    );
    const allComplete = entries.length > 0 && entries.every(isEntryComplete);

    return (
        <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Progress comparison</h3>
                <span className="text-muted-foreground text-[11px]">
                    By completion
                </span>
            </div>
            <p className="text-muted-foreground mb-4 text-xs">
                Each entry is compared by percentage, since units and totals
                differ.
            </p>

            {entries.length === 1 && (
                <div className="bg-muted/60 text-muted-foreground mb-4 flex items-start gap-2 rounded-lg px-3 py-2 text-xs">
                    <Info className="mt-0.5 size-3.5 shrink-0" />
                    Add another entry to compare progress.
                </div>
            )}

            {allComplete && (
                <div className="bg-primary/10 text-primary mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium">
                    <Check className="size-3.5" />
                    Every entry in this group is complete.
                </div>
            )}

            <div className="space-y-4">
                {sorted.map((entry) => {
                    const percent = entryPercent(entry);

                    return (
                        <button
                            key={entry.id}
                            type="button"
                            onClick={() =>
                                navigate({ name: 'entry', id: entry.id })
                            }
                            className="focus-visible:ring-ring/50 group block w-full rounded-md text-left focus-visible:ring-[3px] focus-visible:outline-none"
                        >
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="truncate text-sm font-medium group-hover:underline group-hover:underline-offset-4">
                                    {entry.title}
                                </span>
                                <span className="shrink-0 text-sm font-semibold tabular-nums">
                                    {percent}%
                                </span>
                            </div>
                            <ProgressBar
                                value={percent}
                                className="mt-2 h-2.5"
                                label={`${entry.title}: ${percent}% complete`}
                            />
                            <div className="text-muted-foreground mt-1 text-xs tabular-nums">
                                {entry.completed} / {entry.total} {entry.unit}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
