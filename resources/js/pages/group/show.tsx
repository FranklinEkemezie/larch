import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    FolderPlus,
    ListPlus,
    Pencil,
    Trash2,
} from 'lucide-react';
import { ProgressComparison } from '@/components/analytics/progress-comparison';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { EmptyState } from '@/components/common/empty-state';
import { GroupEntryRow } from '@/components/groups/group-entry-row';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import type { GroupShowProps } from '@/types';

export default function ShowGroup({ group }: GroupShowProps) {
    const { toast } = useToast();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const removeEntry = (entryId: string) => {
        const remaining = group.entries
            .filter((entry) => entry.id !== entryId)
            .map((entry) => entry.id);

        setRemovingId(entryId);

        router.put(
            routes.groups.update(group.id),
            { name: group.name, entries: remaining },
            {
                preserveScroll: true,
                onSuccess: () =>
                    toast({ title: 'Entry removed from group' }),
                onFinish: () => setRemovingId(null),
            },
        );
    };

    return (
        <AppLayout>
            <Head title={group.name} />

            <PageHeader
                title={group.name}
                description={`${group.entries.length} ${
                    group.entries.length === 1 ? 'entry' : 'entries'
                }`}
                backHref={routes.groups.index}
                actions={
                    <>
                        <Button asChild variant="ghost" size="icon">
                            <Link
                                href={routes.groups.edit(group.id)}
                                aria-label="Edit group"
                            >
                                <Pencil />
                            </Link>
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Delete group"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteOpen(true)}
                        >
                            <Trash2 />
                        </Button>
                    </>
                }
            />

            <div className="mb-5 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href={routes.groups.edit(group.id)}>
                        <ListPlus />
                        Manage entries
                    </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                    <Link href={routes.entries.create}>
                        <FolderPlus />
                        New entry
                    </Link>
                </Button>
            </div>

            {group.entries.length === 0 ? (
                <EmptyState
                    icon={ListPlus}
                    title="This group is empty"
                    description="Add existing entries to compare their progress here."
                    action={
                        <Button asChild>
                            <Link href={routes.groups.edit(group.id)}>
                                <ListPlus />
                                Add entries
                            </Link>
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-6">
                    <div className="space-y-2.5">
                        {group.entries.map((entry) => (
                            <GroupEntryRow
                                key={entry.id}
                                entry={entry}
                                removing={removingId === entry.id}
                                onRemove={() => removeEntry(entry.id)}
                            />
                        ))}
                    </div>

                    <ProgressComparison entries={group.entries} />
                </div>
            )}

            <ConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={`Delete “${group.name}”?`}
                description="The group will be deleted. Its entries and their progress stay exactly as they are."
                confirmLabel="Delete group"
                onConfirm={() => {
                    router.delete(routes.groups.destroy(group.id), {
                        onSuccess: () =>
                            toast({ title: 'Group deleted' }),
                    });
                }}
            />
        </AppLayout>
    );
}
