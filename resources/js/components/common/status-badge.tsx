import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { statusLabels } from '@/lib/progress';
import type { EntryStatus } from '@/types';
import { cn } from 'cn';

const styles: Record<EntryStatus, string> = {
    'not-started': 'bg-muted text-muted-foreground',
    'in-progress': 'bg-primary/10 text-primary border border-primary/15',
    completed: 'bg-primary text-primary-foreground',
};

export function StatusBadge({
    status,
    className,
}: {
    status: EntryStatus;
    className?: string;
}) {
    return (
        <Badge
            variant="muted"
            className={cn(styles[status], className)}
            aria-label={`Status: ${statusLabels[status]}`}
        >
            {status === 'completed' && <Check />}
            {statusLabels[status]}
        </Badge>
    );
}
