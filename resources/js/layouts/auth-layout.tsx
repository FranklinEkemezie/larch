import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Sprout } from 'lucide-react';
import { routes } from '@/lib/routes';

export function AuthLayout({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <div className="bg-background relative flex min-h-dvh flex-col overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_60%)]"
            />

            <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-8 sm:py-12">
                <Link
                    href={routes.home}
                    className="focus-visible:ring-ring/50 inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:ring-[3px] focus-visible:outline-none"
                >
                    <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-sm">
                        <Sprout className="size-5" strokeWidth={1.9} />
                    </span>
                    <span className="text-base font-semibold tracking-tight">
                        Larch
                    </span>
                </Link>

                <div className="flex flex-1 flex-col justify-center py-10">
                    <div className="mb-6 space-y-1.5">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-muted-foreground text-sm">
                                {description}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                <p className="text-muted-foreground text-center text-xs">
                    Track what you are working through, one unit at a time.
                </p>
            </div>
        </div>
    );
}
