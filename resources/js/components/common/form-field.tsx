import { Label } from '@/components/ui/label';
import type { ReactNode } from 'react';

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: ReactNode;
    children: ReactNode;
}

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error ? (
                <p className="text-destructive text-xs" role="alert">
                    {error}
                </p>
            ) : (
                hint && (
                    <p className="text-muted-foreground text-xs">{hint}</p>
                )
            )}
        </div>
    );
}
