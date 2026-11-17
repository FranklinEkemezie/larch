import { Checkbox } from '@/components/ui/checkbox';
import { cn } from 'cn';

interface CheckboxRowProps {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    title: string;
    description?: string;
    disabled?: boolean;
    className?: string;
}

export function CheckboxRow({
    id,
    checked,
    onCheckedChange,
    title,
    description,
    disabled,
    className,
}: CheckboxRowProps) {
    return (
        <label
            htmlFor={id}
            className={cn(
                'hover:bg-muted/70 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition-colors',
                disabled && 'cursor-not-allowed opacity-60',
                className,
            )}
        >
            <Checkbox
                id={id}
                checked={checked}
                disabled={disabled}
                onCheckedChange={(value) => onCheckedChange(value === true)}
            />
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                    {title}
                </span>
                {description && (
                    <span className="text-muted-foreground block truncate text-xs">
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}
