import { Head } from '@inertiajs/react';
import { GroupForm } from '@/components/groups/group-form';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { routes } from '@/lib/routes';
import type { GroupEditProps } from '@/types';

export default function EditGroup({ group, entries }: GroupEditProps) {
    return (
        <AppLayout>
            <Head title={`Edit ${group.name}`} />

            <PageHeader
                title="Edit group"
                backHref={routes.groups.show(group.id)}
            />

            <GroupForm
                group={group}
                entries={entries}
                cancelHref={routes.groups.show(group.id)}
            />
        </AppLayout>
    );
}
