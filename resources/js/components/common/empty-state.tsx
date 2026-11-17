import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from 'cn';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center',
                className,
            )}
        >
            <div className="bg-muted text-muted-foreground mb-4 flex size-12 items-center justify-center rounded-full">
                <Icon className="size-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-1 max-w-xs text-sm text-balance">
                {description}
            </p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
