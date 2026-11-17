import type { ReactNode } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';

export function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background min-h-dvh">
            <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
                <main className="flex-1 px-4 pt-6 pb-28">{children}</main>
            </div>
            <BottomNav />
        </div>
    );
}
