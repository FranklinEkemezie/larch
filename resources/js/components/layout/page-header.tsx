import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from 'cn';

interface PageHeaderProps {
    title: string;
    description?: string;
    backHref?: string;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    backHref,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <header className={cn('mb-6 flex items-start gap-2', className)}>
            {backHref && (
                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="-ml-2 shrink-0"
                >
                    <Link href={backHref} aria-label="Go back">
                        <ArrowLeft />
                    </Link>
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
