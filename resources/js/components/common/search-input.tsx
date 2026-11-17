import type * as React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from 'cn';

interface SearchInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
    value: string;
    onValueChange: (value: string) => void;
}

export function SearchInput({
    value,
    onValueChange,
    className,
    placeholder = 'Search…',
    ...props
}: SearchInputProps) {
    return (
        <div className={cn('relative', className)}>
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
                type="search"
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
                placeholder={placeholder}
                className="pr-9 pl-9 [&::-webkit-search-cancel-button]:hidden"
                {...props}
            />
            {value !== '' && (
                <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => onValueChange('')}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 transition-colors"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
}
