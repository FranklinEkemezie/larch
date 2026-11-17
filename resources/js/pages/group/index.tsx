import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FolderPlus, FolderTree, SearchX } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { SearchInput } from '@/components/common/search-input';
import { GroupCard } from '@/components/groups/group-card';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { routes } from '@/lib/routes';
import type { GroupIndexProps } from '@/types';

export default function GroupsIndex({ groups }: GroupIndexProps) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search);

    const visibleGroups = useMemo(() => {
        const needle = debouncedSearch.trim().toLowerCase();

        return groups.filter((group) =>
            needle === '' ? true : group.name.toLowerCase().includes(needle),
        );
    }, [groups, debouncedSearch]);

    return (
        <AppLayout>
            <Head title="Groups" />

            <PageHeader
                title="Groups"
                description={
                    groups.length === 0
                        ? 'Bring related entries together without duplicating progress.'
                        : `${groups.length} ${
                              groups.length === 1 ? 'group' : 'groups'
                          }`
                }
                actions={
                    <Button asChild size="icon" aria-label="New group">
                        <Link href={routes.groups.create}>
                            <FolderPlus />
                        </Link>
                    </Button>
                }
            />

            {groups.length === 0 ? (
                <EmptyState
                    icon={FolderTree}
                    title="No groups yet"
                    description="Group entries by semester, learning path, project or any plan you want to follow."
                    action={
                        <Button asChild>
                            <Link href={routes.groups.create}>
                                <FolderPlus />
                                Create group
                            </Link>
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
                                <GroupCard key={group.id} group={group} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
