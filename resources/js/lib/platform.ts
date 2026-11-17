/**
 * NativePHP injects a `window.Native` bridge into its WebView. Its presence is
 * the only reliable way to tell the packaged Android app from the web build.
 */
export function isNativeApp(): boolean {
    return typeof window !== 'undefined' && 'Native' in window;
}
