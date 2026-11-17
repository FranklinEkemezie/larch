import { Head } from '@inertiajs/react';
import { EntryForm } from '@/components/entries/entry-form';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { routes } from '@/lib/routes';
import type { EntryEditProps } from '@/types';

export default function EditEntry({ entry }: EntryEditProps) {
    return (
        <AppLayout>
            <Head title={`Edit ${entry.title}`} />

            <PageHeader
                title="Edit entry"
                backHref={routes.entries.show(entry.id)}
            />

            <EntryForm
                entry={entry}
                units={[entry.unit]}
                cancelHref={routes.entries.show(entry.id)}
            />
        </AppLayout>
    );
}
