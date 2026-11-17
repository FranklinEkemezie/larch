import type { ReactNode } from 'react';
import { cn } from 'cn';

interface SectionHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function SectionHeader({
    title,
    description,
    action,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn('mb-3 flex items-end justify-between gap-3', className)}>
            <div>
                <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                {description && (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
