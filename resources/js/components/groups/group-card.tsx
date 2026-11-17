import { ChevronRight, FolderTree } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { entryPercent } from '@/lib/progress';
import { navigate } from '@/lib/router';
import type { Entry, Group } from '@/types';

interface GroupCardProps {
    group: Group;
    entries: Entry[];
}

export function GroupCard({ group, entries }: GroupCardProps) {
    const preview = entries.slice(0, 3);
    const remaining = entries.length - preview.length;

    return (
        <button
            type="button"
            onClick={() => navigate({ name: 'group', id: group.id })}
            className="bg-card hover:border-primary/30 focus-visible:ring-ring/50 group w-full rounded-xl border p-4 text-left shadow-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate font-medium">{group.name}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </p>
                </div>
                <ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>

            {preview.length === 0 ? (
                <div className="text-muted-foreground mt-3 flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-xs">
                    <FolderTree className="size-3.5" />
                    No entries yet
                </div>
            ) : (
                <div className="mt-3 space-y-2">
                    {preview.map((entry) => {
                        const percent = entryPercent(entry);

                        return (
                            <div key={entry.id} className="flex items-center gap-2">
                                <span className="text-muted-foreground w-full truncate text-xs">
                                    {entry.title}
                                </span>
                                <Progress
                                    value={percent}
                                    aria-label={`${entry.title}: ${percent}% complete`}
                                    className="h-1.5 w-20 shrink-0"
                                />
                                <span className="w-8 shrink-0 text-right text-[11px] font-medium tabular-nums">
                                    {percent}%
                                </span>
                            </div>
                        );
                    })}
                    {remaining > 0 && (
                        <p className="text-muted-foreground text-[11px]">
                            +{remaining} more
                        </p>
                    )}
                </div>
            )}
        </button>
    );
}
