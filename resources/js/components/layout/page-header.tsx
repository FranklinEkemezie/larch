import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigate } from '@/lib/router';
import type { Route } from '@/lib/router';
import { cn } from 'cn';

interface PageHeaderProps {
    title: string;
    description?: string;
    backTo?: Route;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    backTo,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <header className={cn('mb-5 flex items-start gap-2', className)}>
            {backTo && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Go back"
                    className="-ml-2 shrink-0"
                    onClick={() => navigate(backTo)}
                >
                    <ArrowLeft />
                </Button>
            )}
            <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-semibold tracking-tight break-words">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex shrink-0 items-center gap-1">
                    {actions}
                </div>
            )}
        </header>
    );
}
