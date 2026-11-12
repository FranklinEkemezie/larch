/**
 * Start everything needed for Jump development in one terminal:
 *
 *   1. Vite dev server (HMR + React Fast Refresh)
 *   2. `php artisan native:jump` (QR code + Laravel server + phone bridge)
 *
 * Jump only proxies Vite when `public/hot` exists, so we wait for the hot
 * file before starting Jump. Without this, the phone loads the production
 * bundle from `public/build` and never receives HMR updates.
 *
 * Usage: pnpm dev:mobile
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const php = process.env.PHP_BINARY || 'php';
const viteBin = 'node_modules/vite/bin/vite.js';
const hotFile = 'public/hot';

const children = [];
let shuttingDown = false;

function run(command, args, name) {
    // No shell: `process.execPath` may contain spaces ("C:\Program Files\...")
    // and a shell would split it. `php` resolves via PATH/PATHEXT directly.
    const child = spawn(command, args, {
        stdio: 'inherit',
        shell: false,
    });

    child.on('exit', (code, signal) => {
        if (shuttingDown) return;

        // If either side dies, stop the other so the terminal does not sit on
        // a half-running stack.
        console.log(`\n[dev:mobile] ${name} exited (${signal ?? code}). Stopping.`);
        shutdown(code ?? 1);
    });

    children.push(child);

    return child;
}

function shutdown(code = 0) {
    if (shuttingDown) return;
    shuttingDown = true;

    for (const child of children) {
        if (!child.killed) {
            child.kill('SIGINT');
        }
    }

    setTimeout(() => process.exit(code), 1000);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

async function waitForHotFile(timeoutMs = 30000) {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
        if (existsSync(hotFile)) return true;
        await delay(250);
    }

    return false;
}

console.log('[dev:mobile] Starting Vite...');
run(process.execPath, [viteBin], 'Vite');

if (!(await waitForHotFile())) {
    console.error(
        '[dev:mobile] Vite did not create public/hot within 30s. ' +
            'Jump would fall back to the production build, so aborting.'
    );
    shutdown(1);
} else {
    console.log('[dev:mobile] Vite is ready. Starting NativePHP Jump...');
    run(php, ['artisan', 'native:jump', ...process.argv.slice(2)], 'Jump');
}
