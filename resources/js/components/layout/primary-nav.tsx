import { Link, usePage } from '@inertiajs/react';
import { FolderTree, Home, ListChecks, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from 'cn';
import { routes } from '@/lib/routes';

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: (url: string) => boolean;
}

export const navItems: NavItem[] = [
    {
        label: 'Home',
        href: routes.home,
        icon: Home,
        isActive: (url) => url === '/',
    },
    {
        label: 'Entries',
        href: routes.entries.index,
        icon: ListChecks,
        isActive: (url) => url.startsWith('/entries'),
    },
    {
        label: 'Groups',
        href: routes.groups.index,
        icon: FolderTree,
        isActive: (url) => url.startsWith('/groups'),
    },
];

function path(url: string): string {
    return url.split('?')[0] ?? url;
}

export function isActiveItem(item: NavItem, url: string): boolean {
    return item.isActive(path(url));
}

export function SidebarNav() {
    const { url } = usePage();

    return (
        <nav aria-label="Primary" className="grid gap-1">
            {navItems.map((item) => {
                const active = isActiveItem(item, url);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            active
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                        )}
                    >
                        <Icon
                            className="size-4"
                            strokeWidth={active ? 2.2 : 1.9}
                        />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export function BottomNav({ onOpenSettings }: { onOpenSettings: () => void }) {
    const { url } = usePage();

    return (
        <nav
            aria-label="Primary"
            className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur lg:hidden"
        >
            <div className="mx-auto grid w-full max-w-md grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                {navItems.map((item) => {
                    const active = isActiveItem(item, url);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
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
                        </Link>
                    );
                })}

                <button
                    type="button"
                    onClick={onOpenSettings}
                    className="text-muted-foreground hover:text-foreground flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors"
                >
                    <Settings className="size-5" strokeWidth={1.9} />
                    Settings
                </button>
            </div>
        </nav>
    );
}
