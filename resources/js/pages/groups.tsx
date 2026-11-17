import { useMemo, useState } from 'react';
import { FolderPlus, FolderTree, SearchX } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { SearchInput } from '@/components/common/search-input';
import { GroupCard } from '@/components/groups/group-card';
import { GroupFormDialog } from '@/components/groups/group-form-dialog';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/data/store';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import type { Entry } from '@/types';

export function GroupsPage() {
    const { entries, groups } = useAppData();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search);
    const [formOpen, setFormOpen] = useState(false);

    const entriesById = useMemo(
        () => new Map(entries.map((entry) => [entry.id, entry])),
        [entries],
    );

    const visibleGroups = useMemo(() => {
        const needle = debouncedSearch.trim().toLowerCase();

        return groups.filter((group) =>
            needle === '' ? true : group.name.toLowerCase().includes(needle),
        );
    }, [groups, debouncedSearch]);

    const entriesFor = (entryIds: string[]): Entry[] =>
        entryIds
            .map((id) => entriesById.get(id))
            .filter((entry): entry is Entry => entry !== undefined);

    return (
        <>
            <PageHeader
                title="Groups"
                description={
                    groups.length === 0
                        ? 'Organise related entries without duplicating progress.'
                        : `${groups.length} ${
                              groups.length === 1 ? 'group' : 'groups'
                          }`
                }
                actions={
                    <Button
                        type="button"
                        size="icon"
                        aria-label="New group"
                        onClick={() => setFormOpen(true)}
                    >
                        <FolderPlus />
                    </Button>
                }
            />

            {groups.length === 0 ? (
                <EmptyState
                    icon={FolderTree}
                    title="No groups yet"
                    description="Group related entries such as a semester, a learning path or a monthly plan."
                    action={
                        <Button onClick={() => setFormOpen(true)}>
                            <FolderPlus />
                            Create group
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-4">
                    <SearchInput
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Search groups…"
                        aria-label="Search groups"
                    />

                    {visibleGroups.length === 0 ? (
                        <EmptyState
                            icon={SearchX}
                            title="No matching groups"
                            description={`Nothing matches “${debouncedSearch}”.`}
                            action={
                                <Button
                                    variant="outline"
                                    onClick={() => setSearch('')}
                                >
                                    Clear search
                                </Button>
                            }
                        />
                    ) : (
                        <div className="space-y-2.5">
                            {visibleGroups.map((group) => (
                                <GroupCard
                                    key={group.id}
                                    group={group}
                                    entries={entriesFor(group.entryIds)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <GroupFormDialog open={formOpen} onOpenChange={setFormOpen} />
        </>
    );
}
