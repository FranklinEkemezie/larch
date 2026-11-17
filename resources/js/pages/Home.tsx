import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    FolderTree,
    ListChecks,
    Plus,
    Sparkles,
} from 'lucide-react';
import { EntryQuickRow } from '@/components/entries/entry-quick-row';
import { GroupCard } from '@/components/groups/group-card';
import { AppLayout } from '@/components/layout/app-layout';
import { SectionHeader } from '@/components/layout/section-header';
import { StatCard } from '@/components/common/stat-card';
import { Button } from '@/components/ui/button';
import { greeting, todayLabel } from '@/lib/format';
import { isEntryComplete } from '@/lib/progress';
import { routes } from '@/lib/routes';
import type { HomeProps } from '@/types';

function WelcomeActions() {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <Link
                href={routes.entries.index}
                className="bg-card hover:border-primary/30 focus-visible:ring-ring/50 group rounded-xl border p-5 shadow-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
            >
                <ListChecks className="text-primary size-5" strokeWidth={1.9} />
                <p className="mt-3 font-medium">Entries</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                    See everything you are tracking.
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Open entries
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
            </Link>

            <Link
                href={routes.groups.index}
                className="bg-card hover:border-primary/30 focus-visible:ring-ring/50 group rounded-xl border p-5 shadow-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
            >
                <FolderTree
                    className="text-primary size-5"
                    strokeWidth={1.9}
                />
                <p className="mt-3 font-medium">Groups</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                    Compare entries that belong together.
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Open groups
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
            </Link>
        </div>
    );
}

export default function Home({ entries, groups }: HomeProps) {
    const hasOverview = entries !== undefined || groups !== undefined;
    const entryList = entries ?? [];
    const groupList = groups ?? [];

    const inProgress = [...entryList]
        .filter((entry) => !isEntryComplete(entry))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 4);

    const completedCount = entryList.filter(isEntryComplete).length;

    return (
        <AppLayout>
            <Head title="Home" />

            <header className="mb-6">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    {todayLabel()}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                    {greeting()}
                </h1>
            </header>

            {!hasOverview ? (
                <WelcomeActions />
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-2.5">
                        <StatCard
                            icon={ListChecks}
                            label="Entries"
                            value={entryList.length}
                        />
                        <StatCard
                            icon={CheckCircle2}
                            label="Completed"
                            value={completedCount}
                        />
                        <StatCard
                            icon={FolderTree}
                            label="Groups"
                            value={groupList.length}
                        />
                    </div>

                    <section>
                        <SectionHeader
                            title="Keep going"
                            action={
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={routes.entries.index}>
                                        All entries
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            }
                        />

                        {inProgress.length === 0 ? (
                            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-4">
                                <p className="text-muted-foreground text-sm">
                                    Nothing is in progress right now.
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={routes.entries.create}>
                                        <Plus />
                                        New entry
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {inProgress.map((entry) => (
                                    <EntryQuickRow
                                        key={entry.id}
                                        entry={entry}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section>
                        <SectionHeader
                            title="Groups"
                            action={
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={routes.groups.index}>
                                        All groups
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            }
                        />

                        {groupList.length === 0 ? (
                            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-4">
                                <p className="text-muted-foreground text-sm">
                                    No groups yet.
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={routes.groups.create}>
                                        <Sparkles />
                                        Create a group
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {groupList.slice(0, 3).map((group) => (
                                    <GroupCard key={group.id} group={group} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </AppLayout>
    );
}
