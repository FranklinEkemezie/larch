import { useEffect, useState } from 'react';

export type Route =
    | { name: 'home' }
    | { name: 'entries' }
    | { name: 'entry'; id: string }
    | { name: 'groups' }
    | { name: 'group'; id: string }
    | { name: 'settings' };

/**
 * Hash routing keeps the preview self-contained while the Laravel routes are
 * still being built. Swapping this for Inertia navigation later only requires
 * replacing `navigate()` and the route switch.
 */
export function parseRoute(hash: string): Route {
    const path = hash.replace(/^#/, '') || '/';
    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0) {
        return { name: 'home' };
    }

    if (segments[0] === 'entries') {
        return segments[1]
            ? { name: 'entry', id: segments[1] }
            : { name: 'entries' };
    }

    if (segments[0] === 'groups') {
        return segments[1]
            ? { name: 'group', id: segments[1] }
            : { name: 'groups' };
    }

    if (segments[0] === 'settings') {
        return { name: 'settings' };
    }

    return { name: 'home' };
}

export function routeHref(route: Route): string {
    switch (route.name) {
        case 'entries':
            return '#/entries';
        case 'entry':
            return `#/entries/${route.id}`;
        case 'groups':
            return '#/groups';
        case 'group':
            return `#/groups/${route.id}`;
        case 'settings':
            return '#/settings';
        case 'home':
        default:
            return '#/';
    }
}

export function navigate(route: Route | string): void {
    const href = typeof route === 'string' ? route : routeHref(route);

    if (window.location.hash === href) {
        window.scrollTo({ top: 0 });
        return;
    }

    window.location.hash = href;
}

export function useRoute(): Route {
    const [route, setRoute] = useState<Route>(() =>
        parseRoute(window.location.hash),
    );

    useEffect(() => {
        const onChange = () => {
            setRoute(parseRoute(window.location.hash));
            window.scrollTo({ top: 0 });
        };

        window.addEventListener('hashchange', onChange);

        return () => window.removeEventListener('hashchange', onChange);
    }, []);

    return route;
}
