import { Head } from '@inertiajs/react';
import { EntryForm } from '@/components/entries/entry-form';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { routes } from '@/lib/routes';

export default function CreateEntry() {
    return (
        <AppLayout>
            <Head title="New entry" />

            <PageHeader
                title="New entry"
                backHref={routes.entries.index}
            />

            <EntryForm cancelHref={routes.entries.index} />
        </AppLayout>
    );
}
