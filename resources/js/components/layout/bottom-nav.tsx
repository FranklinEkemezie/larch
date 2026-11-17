import { FolderTree, Home, ListChecks, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navigate, useRoute } from '@/lib/router';
import type { Route } from '@/lib/router';
import { cn } from 'cn';

interface NavItem {
    label: string;
    icon: LucideIcon;
    route: Route;
    isActive: (route: Route) => boolean;
}

const items: NavItem[] = [
    {
        label: 'Home',
        icon: Home,
        route: { name: 'home' },
        isActive: (route) => route.name === 'home',
    },
    {
        label: 'Entries',
        icon: ListChecks,
        route: { name: 'entries' },
        isActive: (route) => route.name === 'entries' || route.name === 'entry',
    },
    {
        label: 'Groups',
        icon: FolderTree,
        route: { name: 'groups' },
        isActive: (route) => route.name === 'groups' || route.name === 'group',
    },
    {
        label: 'Settings',
        icon: Settings,
        route: { name: 'settings' },
        isActive: (route) => route.name === 'settings',
    },
];

export function BottomNav() {
    const route = useRoute();

    return (
        <nav
            aria-label="Primary"
            className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur"
        >
            <div className="mx-auto grid w-full max-w-md grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                {items.map((item) => {
                    const active = item.isActive(route);
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => navigate(item.route)}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                                'flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors',
                                active
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                        >
                            <Icon
                                className={cn(
                                    'size-5',
                                    active && 'fill-primary/10',
                                )}
                                strokeWidth={active ? 2.25 : 1.9}
                            />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
