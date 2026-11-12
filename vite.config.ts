import inertia from '@inertiajs/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
        inertia(),
    ],
    server: {
        // Bind IPv4 explicitly. NativePHP Jump reads `public/hot` and rewrites
        // the dev-server origin; an IPv6 origin ([::1]) is mangled into a
        // broken relative asset URL, so the phone 404s on /@vite/client.
        host: '127.0.0.1',
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
