import { useEffect, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { ProgressBar } from '@/components/common/progress-bar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppData } from '@/data/store';
import { entryPercent, entryStatus } from '@/lib/progress';
import type { Entry } from '@/types';

export function ProgressControls({ entry }: { entry: Entry }) {
    const { setEntryProgress } = useAppData();
    const [exact, setExact] = useState(String(entry.completed));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setExact(String(entry.completed));
        setError(null);
    }, [entry.completed]);

    const percent = entryPercent(entry);
    const status = entryStatus(entry);

    const decrement = () => setEntryProgress(entry.id, entry.completed - 1);
    const increment = () => setEntryProgress(entry.id, entry.completed + 1);

    const applyExact = (event: React.FormEvent) => {
        event.preventDefault();

        const value = Number(exact);

        if (!Number.isInteger(value)) {
            setError('Enter a whole number.');
            return;
        }

        if (value < 0 || value > entry.total) {
            setError(`Enter a value between 0 and ${entry.total}.`);
            return;
        }

        setError(null);
        setEntryProgress(entry.id, value);
    };

    return (
        <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="font-medium">Update progress</p>
                    <p className="text-muted-foreground text-xs">
                        {status === 'completed'
                            ? 'Everything is complete.'
                            : `Keep going — ${entry.total - entry.completed} ${entry.unit.toLowerCase()} to go.`}
                    </p>
                </div>
                <span className="text-2xl font-semibold tabular-nums">
                    {percent}%
                </span>
            </div>

            <ProgressBar
                value={percent}
                className="mt-4 h-2.5"
                label={`${entry.title}: ${percent}% complete`}
            />

            <div className="mt-5 flex items-center justify-center gap-6">
                <Button
                    type="button"
                    variant="outline"
                    size="icon-lg"
                    className="size-12 rounded-full"
                    aria-label={`Decrease completed ${entry.unit}`}
                    disabled={entry.completed <= 0}
                    onClick={decrement}
                >
                    <Minus className="size-5" />
                </Button>

                <div className="text-center">
                    <div className="text-3xl font-semibold tabular-nums">
                        {entry.completed}
                    </div>
                    <div className="text-muted-foreground text-xs">
                        of {entry.total} {entry.unit.toLowerCase()}
                    </div>
                </div>

                <Button
                    type="button"
                    size="icon-lg"
                    className="size-12 rounded-full"
                    aria-label={`Increase completed ${entry.unit}`}
                    disabled={entry.completed >= entry.total}
                    onClick={increment}
                >
                    <Plus className="size-5" />
                </Button>
            </div>

            {status === 'completed' && (
                <div className="bg-primary/10 text-primary mt-4 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium">
                    <Check className="size-4" />
                    Entry complete
                </div>
            )}

            <form onSubmit={applyExact} className="mt-5 space-y-2">
                <Label htmlFor="exact-progress">Set exact progress</Label>
                <div className="flex gap-2">
                    <Input
                        id="exact-progress"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={entry.total}
                        step={1}
                        value={exact}
                        aria-invalid={error !== null}
                        aria-describedby={error ? 'exact-progress-error' : undefined}
                        onChange={(event) => setExact(event.target.value)}
                        className="w-24"
                    />
                    <Button type="submit" variant="secondary">
                        Apply
                    </Button>
                </div>
                {error && (
                    <p
                        id="exact-progress-error"
                        className="text-destructive text-xs"
                    >
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
