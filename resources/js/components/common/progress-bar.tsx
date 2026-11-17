import { Progress } from '@/components/ui/progress';
import { cn } from 'cn';

interface ProgressBarProps {
    value: number;
    className?: string;
    indicatorClassName?: string;
    label?: string;
}

export function ProgressBar({
    value,
    className,
    indicatorClassName,
    label,
}: ProgressBarProps) {
    const clamped = Math.min(Math.max(Math.round(value), 0), 100);

    return (
        <Progress
            value={clamped}
            aria-label={label ?? `${clamped}% complete`}
            className={cn('h-2', className)}
            indicatorClassName={indicatorClassName}
        />
    );
}
