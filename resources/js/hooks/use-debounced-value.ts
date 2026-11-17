import { useEffect, useState } from 'react';

/** Keeps search inputs responsive while filtering larger entry lists. */
export function useDebouncedValue<T>(value: T, delay = 200): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = window.setTimeout(() => setDebounced(value), delay);

        return () => window.clearTimeout(timeout);
    }, [value, delay]);

    return debounced;
}
