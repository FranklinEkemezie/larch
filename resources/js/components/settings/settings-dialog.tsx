import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { LogOut, Monitor, Moon, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { pendingRoutes } from '@/lib/routes';
import { useTheme } from '@/theme/theme-provider';
import type { SharedPageProps, ThemeMode } from '@/types';
import { cn } from 'cn';

const themeOptions: {
    value: ThemeMode;
    label: string;
    icon: LucideIcon;
}[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
];

function ThemeOption({
    value,
    label,
    icon: Icon,
    selected,
    onSelect,
}: {
    value: ThemeMode;
    label: string;
    icon: LucideIcon;
    selected: boolean;
    onSelect: (value: ThemeMode) => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(value)}
            className={cn(
                'focus-visible:ring-ring/50 flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none',
                selected
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60',
            )}
        >
            <Icon className="size-4" strokeWidth={1.9} />
            {label}
        </button>
    );
}

export function SettingsDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { mode, setMode } = useTheme();
    const { auth } = usePage<SharedPageProps>().props;
    const user = auth?.user;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <section className="space-y-3">
                    <h2 className="text-sm font-medium">Appearance</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {themeOptions.map((option) => (
                            <ThemeOption
                                key={option.value}
                                {...option}
                                selected={mode === option.value}
                                onSelect={setMode}
                            />
                        ))}
                    </div>
                </section>

                {user && (
                    <>
                        <Separator />
                        <section className="space-y-3">
                            <h2 className="text-sm font-medium">Account</h2>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {user.name}
                                </p>
                                <p className="text-muted-foreground truncate text-xs">
                                    {user.email}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.post(pendingRoutes.logout)}
                            >
                                <LogOut />
                                Sign out
                            </Button>
                        </section>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
