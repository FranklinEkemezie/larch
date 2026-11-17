import '@fontsource-variable/inter';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider } from '@/components/ui/toast';
import { initTheme, ThemeProvider } from '@/theme/theme-provider';

initTheme();

const pages = import.meta.glob('./pages/**/*.tsx') as Record<
    string,
    () => Promise<ComponentType>
>;

createInertiaApp({
    title: (title) => (title ? `${title} · Larch` : 'Larch'),
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, pages),
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <ToastProvider>
                    <App {...props} />
                </ToastProvider>
            </ThemeProvider>,
        );
    },
    progress: {
        color: 'var(--primary)',
    },
});
