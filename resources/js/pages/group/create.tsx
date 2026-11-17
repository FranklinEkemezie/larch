import { Head } from '@inertiajs/react';
import { GroupForm } from '@/components/groups/group-form';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { routes } from '@/lib/routes';
import type { GroupCreateProps } from '@/types';

export default function CreateGroup({ entries }: GroupCreateProps) {
    return (
        <AppLayout>
            <Head title="New group" />

            <PageHeader title="New group" backHref={routes.groups.index} />

            <GroupForm entries={entries} cancelHref={routes.groups.index} />
        </AppLayout>
    );
}
