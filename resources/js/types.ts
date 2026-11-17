/**
 * Shapes returned by the Laravel API resources.
 *
 * Entry matches `App\Http\Resources\EntryResource`.
 * Group matches `App\Http\Resources\GroupResource`.
 */
export interface Entry {
    id: string;
    title: string;
    unit: string;
    completed: number;
    total: number;
    createdAt: string;
    updatedAt: string;
}

export interface Group {
    id: string;
    name: string;
    entries: Entry[];
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

/**
 * Data the frontend expects Laravel to share with every Inertia response.
 * The middleware does not share it yet, so consumers must treat it as
 * optional until that gap is closed.
 */
export interface SharedPageProps {
    auth?: {
        user: AuthUser;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export type EntryStatus = 'not-started' | 'in-progress' | 'completed';

export type EntryFilter = 'all' | EntryStatus;

export type EntrySort =
    | 'newest'
    | 'oldest'
    | 'title-asc'
    | 'title-desc'
    | 'progress-asc'
    | 'progress-desc';

export type ThemeMode = 'light' | 'dark' | 'system';

/** Inertia page props for the entry pages. */
export interface EntryIndexProps {
    entries: Entry[];
}

export interface EntryShowProps {
    entry: Entry;
    groups: Group[];
}

export interface EntryEditProps {
    entry: Entry;
}

export interface GroupIndexProps {
    groups: Group[];
}

export interface GroupShowProps {
    group: Group;
}

export interface GroupEditProps {
    group: Group;
    entries: Entry[];
}

export interface GroupCreateProps {
    entries: Entry[];
}

/**
 * The home controller does not pass any data yet. These optional props let the
 * screen render a useful overview as soon as the backend starts sharing them.
 */
export interface HomeProps {
    entries?: Entry[];
    groups?: Group[];
}
