import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Settings as SettingsIcon, Sprout } from 'lucide-react';
import { BottomNav, SidebarNav } from '@/components/layout/primary-nav';
import { SettingsDialog } from '@/components/settings/settings-dialog';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';

function Brand() {
    return (
        <Link
            href={routes.home}
            className="focus-visible:ring-ring/50 flex items-center gap-2.5 rounded-lg focus-visible:ring-[3px] focus-visible:outline-none"
        >
            <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-sm">
                <Sprout className="size-5" strokeWidth={1.9} />
            </span>
            <span className="text-base font-semibold tracking-tight">
                Larch
            </span>
        </Link>
    );
}

export function AppLayout({ children }: { children: ReactNode }) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <div className="bg-background min-h-dvh">
            <aside className="bg-background/80 fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r p-4 backdrop-blur lg:flex">
                <div className="px-2 py-2">
                    <Brand />
                </div>
                <div className="mt-6 flex-1">
                    <SidebarNav />
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => setSettingsOpen(true)}
                >
                    <SettingsIcon />
                    Settings
                </Button>
            </aside>

            <header className="bg-background/90 sticky top-0 z-30 border-b px-4 py-3 backdrop-blur lg:hidden">
                <div className="flex items-center justify-between">
                    <Brand />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Open settings"
                        onClick={() => setSettingsOpen(true)}
                    >
                        <SettingsIcon />
                    </Button>
                </div>
            </header>

            <div className="lg:pl-64">
                <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pt-10 lg:pb-14">
                    {children}
                </main>
            </div>

            <BottomNav onOpenSettings={() => setSettingsOpen(true)} />

            <SettingsDialog
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
            />
        </div>
    );
}
