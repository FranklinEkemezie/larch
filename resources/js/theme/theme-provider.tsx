import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode } from '@/types';

const STORAGE_KEY = 'larch.theme';

function systemPrefersDark(): boolean {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export function getStoredTheme(): ThemeMode {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
    } catch {
        // Storage can be unavailable (private mode, quota); fall back to system.
    }

    return 'system';
}

export function applyTheme(mode: ThemeMode): void {
    const isDark = mode === 'dark' || (mode === 'system' && systemPrefersDark());

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

/** Called once before React renders so there is no flash of the wrong theme. */
export function initTheme(): void {
    applyTheme(getStoredTheme());
}

interface ThemeContextValue {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>(getStoredTheme);

    useEffect(() => {
        applyTheme(mode);

        try {
            window.localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // Persisting the preference is best-effort.
        }
    }, [mode]);

    useEffect(() => {
        if (mode !== 'system') {
            return;
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => applyTheme('system');

        media.addEventListener('change', onChange);

        return () => media.removeEventListener('change', onChange);
    }, [mode]);

    const setMode = useCallback((next: ThemeMode) => setModeState(next), []);

    const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
}
