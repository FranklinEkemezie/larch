import { useState } from 'react';
import {
    FolderTree,
    Pencil,
    Plus,
    Trash2,
    CalendarDays,
    Clock,
} from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { EmptyState } from '@/components/common/empty-state';
import { ProgressBar } from '@/components/common/progress-bar';
import { StatusBadge } from '@/components/common/status-badge';
import { EntryFormDialog } from '@/components/entries/entry-form-dialog';
import { ProgressControls } from '@/components/entries/progress-controls';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeader } from '@/components/layout/section-header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAppData } from '@/data/store';
import { formatDate } from '@/lib/format';
import { entryPercent, entryStatus } from '@/lib/progress';
import { navigate } from '@/lib/router';
import type { Entry } from '@/types';

export function EntryDetailPage({ id }: { id: string }) {
    const { entries, entryGroups, deleteEntry } = useAppData();
    const { toast } = useToast();

    const entry = entries.find((item) => item.id === id);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    if (!entry) {
        return (
            <>
                <PageHeader title="Entry" backTo={{ name: 'entries' }} />
                <EmptyState
                    icon={FolderTree}
                    title="Entry not found"
                    description="This entry may have been deleted."
                    action={
                        <Button onClick={() => navigate({ name: 'entries' })}>
                            Back to entries
                        </Button>
                    }
                />
            </>
        );
    }

    const groups = entryGroups(entry.id);
    const percent = entryPercent(entry);
    const status = entryStatus(entry);

    return (
        <>
            <PageHeader
                title={entry.title}
                description={`${entry.completed} / ${entry.total} ${entry.unit}`}
                backTo={{ name: 'entries' }}
                actions={
                    <>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Edit entry"
                            onClick={() => setEditOpen(true)}
                        >
                            <Pencil />
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
                <SectionHeader
                    title="Groups"
                    description="Progress stays in sync wherever this entry appears."
                />

                {groups.length === 0 ? (
                    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-4">
                        <p className="text-muted-foreground text-sm">
                            This entry is not in a group yet.
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditOpen(true)}
                        >
                            <Plus />
                            Add to a group
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {groups.map((group) => (
                            <Button
                                key={group.id}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                onClick={() =>
                                    navigate({ name: 'group', id: group.id })
                                }
                            >
                                <FolderTree />
                                {group.name}
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

            <EntryFormDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                entry={entry}
            />

            <ConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={`Delete “${entry.title}”?`}
                description="This permanently removes the entry and its progress from every group. This cannot be undone."
                confirmLabel="Delete entry"
                onConfirm={() => {
                    deleteEntry(entry.id);
                    toast({
                        title: 'Entry deleted',
                        description: entry.title,
                    });
                    navigate({ name: 'entries' });
                }}
            />
        </>
    );
}
