import { Link } from '@inertiajs/react';
import { ChevronRight, FolderTree } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { routes } from '@/lib/routes';
import { entryPercent } from '@/lib/progress';
import type { Group } from '@/types';

export function GroupCard({ group }: { group: Group }) {
    const preview = group.entries.slice(0, 3);
    const remaining = group.entries.length - preview.length;

    return (
        <article className="bg-card hover:border-primary/30 relative rounded-xl border p-4 shadow-sm transition-colors">
            <Link
                href={routes.groups.show(group.id)}
                className="focus-visible:ring-ring/50 absolute inset-0 z-0 rounded-xl focus-visible:ring-[3px] focus-visible:outline-none"
                aria-label={`View ${group.name}`}
            />

            <div className="pointer-events-none relative z-10">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate font-medium">{group.name}</p>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                            {group.entries.length}{' '}
                            {group.entries.length === 1 ? 'entry' : 'entries'}
                        </p>
                    </div>
                    <ChevronRight className="text-muted-foreground size-4 shrink-0" />
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
                                <div
                                    key={entry.id}
                                    className="flex items-center gap-2"
                                >
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
            </div>
        </article>
    );
}
