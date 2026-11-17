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
    entryIds: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AppData {
    entries: Entry[];
    groups: Group[];
}

export interface EntryInput {
    title: string;
    unit: string;
    total: number;
    completed: number;
    groupIds: string[];
}

export interface GroupInput {
    name: string;
    entryIds: string[];
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
