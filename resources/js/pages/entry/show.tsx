import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    CalendarDays,
    Clock,
    FolderTree,
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { ProgressControls } from '@/components/entries/progress-controls';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { formatDate } from '@/lib/format';
import { entryPercent, entryStatus } from '@/lib/progress';
import { routes } from '@/lib/routes';
import type { EntryShowProps } from '@/types';

export default function ShowEntry({ entry, groups }: EntryShowProps) {
    const { toast } = useToast();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const percent = entryPercent(entry);
    const status = entryStatus(entry);

    return (
        <AppLayout>
            <Head title={entry.title} />

            <PageHeader
                title={entry.title}
                description={`${entry.completed} / ${entry.total} ${entry.unit}`}
                backHref={routes.entries.index}
                actions={
                    <>
                        <Button asChild variant="ghost" size="icon">
                            <Link
                                href={routes.entries.edit(entry.id)}
                                aria-label="Edit entry"
                            >
                                <Pencil />
                            </Link>
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Delete entry"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteOpen(true)}
                        >
                            <Trash2 />
                        </Button>
                    </>
                }
            />

            <div className="bg-card rounded-xl border p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <StatusBadge status={status} />
                    <span className="text-muted-foreground text-xs">
                        {entry.unit}
                    </span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-4xl font-semibold tracking-tight tabular-nums">
                            {entry.completed}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            of {entry.total} {entry.unit.toLowerCase()}
                        </p>
                    </div>
                    <p className="text-primary text-2xl font-semibold tabular-nums">
                        {percent}%
                    </p>
                </div>

                <ProgressBar
                    value={percent}
                    className="mt-4 h-2.5"
                    label={`${entry.title}: ${percent}% complete`}
                />
            </div>

            <div className="mt-4">
                <ProgressControls entry={entry} />
            </div>

            <section className="mt-6">
                <h2 className="mb-3 text-base font-semibold tracking-tight">
                    Groups
                </h2>

                {groups.length === 0 ? (
                    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-4">
                        <p className="text-muted-foreground text-sm">
                            This entry is not in a group yet.
                        </p>
                        <Button asChild variant="outline" size="sm">
                            <Link href={routes.groups.index}>
                                <Plus />
                                Add it from a group
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {groups.map((group) => (
                            <Button
                                key={group.id}
                                asChild
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                            >
                                <Link href={routes.groups.show(group.id)}>
                                    <FolderTree />
                                    {group.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}
            </section>

            <section className="mt-6">
                <div className="bg-muted/40 text-muted-foreground grid gap-2 rounded-xl border p-4 text-xs">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="size-3.5" />
                        Added {formatDate(entry.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="size-3.5" />
                        Last updated {formatDate(entry.updatedAt)}
                    </div>
                </div>
            </section>

            <ConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={`Delete “${entry.title}”?`}
                description="This permanently removes the entry and its progress from every group. This cannot be undone."
                confirmLabel="Delete entry"
                onConfirm={() => {
                    router.delete(routes.entries.destroy(entry.id), {
                        onSuccess: () =>
                            toast({ title: 'Entry deleted' }),
                    });
                }}
            />
        </AppLayout>
    );
}
