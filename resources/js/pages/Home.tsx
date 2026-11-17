import { ArrowRight, Sprout } from 'lucide-react';
// import { ArrowRight, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_60%)]"
            />

            <div className="relative flex w-full max-w-md flex-col items-center gap-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Sprout className="size-8" strokeWidth={1.75} />
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
                        Personal progress tracker
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight">
                        Hello
                    </h1>
                    <p className="text-muted-foreground text-balance">
                        A quiet place to track the work that matters — one
                        entry, one group, one step at a time.
                    </p>
                </div>

                <Button size="lg" className="w-full sm:w-auto">
                    Get started
                    <ArrowRight />
                </Button>

                <p className="text-xs text-muted-foreground">
                    Foundation ready · Inertia + React
                </p>
            </div>
        </main>
    );
}
