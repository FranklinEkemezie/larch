import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import type { ReactNode } from 'react';
import { createSeedData } from '@/data/seed';
import { clampCompleted } from '@/lib/progress';
import type {
    AppData,
    Entry,
    EntryInput,
    Group,
    GroupInput,
} from '@/types';

const STORAGE_KEY = 'larch.data.v1';

export type AppAction =
    | { type: 'entry/create'; entry: Entry; groupIds: string[]; at: string }
    | { type: 'entry/update'; entry: Entry; groupIds: string[]; at: string }
    | { type: 'entry/delete'; id: string; at: string }
    | { type: 'entry/progress'; id: string; completed: number; at: string }
    | { type: 'group/create'; group: Group }
    | { type: 'group/rename'; id: string; name: string; at: string }
    | { type: 'group/delete'; id: string }
    | {
          type: 'group/add-entries';
          id: string;
          entryIds: string[];
          at: string;
      }
    | {
          type: 'group/remove-entry';
          id: string;
          entryId: string;
          at: string;
      }
    | { type: 'data/reset'; data: AppData };

/** Keeps group membership in sync when an entry is created or edited. */
function syncMembership(
    groups: Group[],
    entryId: string,
    groupIds: string[],
    at: string,
): Group[] {
    return groups.map((group) => {
        const shouldContain = groupIds.includes(group.id);
        const contains = group.entryIds.includes(entryId);

        if (shouldContain === contains) {
            return group;
        }

        return {
            ...group,
            entryIds: shouldContain
                ? [...group.entryIds, entryId]
                : group.entryIds.filter((id) => id !== entryId),
            updatedAt: at,
        };
    });
}

export function appReducer(state: AppData, action: AppAction): AppData {
    switch (action.type) {
        case 'entry/create':
            return {
                entries: [action.entry, ...state.entries],
                groups: syncMembership(
                    state.groups,
                    action.entry.id,
                    action.groupIds,
                    action.at,
                ),
            };

        case 'entry/update':
            return {
                entries: state.entries.map((entry) =>
                    entry.id === action.entry.id
                        ? { ...action.entry, createdAt: entry.createdAt }
                        : entry,
                ),
                groups: syncMembership(
                    state.groups,
                    action.entry.id,
                    action.groupIds,
                    action.at,
                ),
            };

        case 'entry/delete':
            return {
                entries: state.entries.filter(
                    (entry) => entry.id !== action.id,
                ),
                groups: state.groups.map((group) =>
                    group.entryIds.includes(action.id)
                        ? {
                              ...group,
                              entryIds: group.entryIds.filter(
                                  (id) => id !== action.id,
                              ),
                              updatedAt: action.at,
                          }
                        : group,
                ),
            };

        case 'entry/progress':
            return {
                entries: state.entries.map((entry) =>
                    entry.id === action.id
                        ? {
                              ...entry,
                              completed: clampCompleted(
                                  action.completed,
                                  entry.total,
                              ),
                              updatedAt: action.at,
                          }
                        : entry,
                ),
                groups: state.groups,
            };

        case 'group/create':
            return {
                entries: state.entries,
                groups: [action.group, ...state.groups],
            };

        case 'group/rename':
            return {
                entries: state.entries,
                groups: state.groups.map((group) =>
                    group.id === action.id
                        ? { ...group, name: action.name, updatedAt: action.at }
                        : group,
                ),
            };

        case 'group/delete':
            return {
                entries: state.entries,
                groups: state.groups.filter((group) => group.id !== action.id),
            };

        case 'group/add-entries':
            return {
                entries: state.entries,
                groups: state.groups.map((group) =>
                    group.id === action.id
                        ? {
                              ...group,
                              entryIds: Array.from(
                                  new Set([
                                      ...group.entryIds,
                                      ...action.entryIds,
                                  ]),
                              ),
                              updatedAt: action.at,
                          }
                        : group,
                ),
            };

        case 'group/remove-entry':
            return {
                entries: state.entries,
                groups: state.groups.map((group) =>
                    group.id === action.id
                        ? {
                              ...group,
                              entryIds: group.entryIds.filter(
                                  (id) => id !== action.entryId,
                              ),
                              updatedAt: action.at,
                          }
                        : group,
                ),
            };

        case 'data/reset':
            return action.data;

        default:
            return state;
    }
}

function isAppData(value: unknown): value is AppData {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const candidate = value as Partial<AppData>;

    return Array.isArray(candidate.entries) && Array.isArray(candidate.groups);
}

export function loadData(): AppData {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (raw) {
            const parsed: unknown = JSON.parse(raw);

            if (isAppData(parsed)) {
                return parsed;
            }
        }
    } catch {
        // Corrupt or unavailable storage falls back to the demo data.
    }

    return createSeedData();
}

function createId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random()}`;
}

interface AppDataContextValue extends AppData {
    createEntry: (input: EntryInput) => Entry;
    updateEntry: (id: string, input: EntryInput) => void;
    deleteEntry: (id: string) => void;
    setEntryProgress: (id: string, completed: number) => void;
    createGroup: (input: GroupInput) => Group;
    renameGroup: (id: string, name: string) => void;
    deleteGroup: (id: string) => void;
    addEntriesToGroup: (id: string, entryIds: string[]) => void;
    removeEntryFromGroup: (id: string, entryId: string) => void;
    resetData: () => void;
    entryGroups: (entryId: string) => Group[];
    units: string[];
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, undefined, loadData);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Persistence is best-effort while the real backend is pending.
        }
    }, [state]);

    const createEntry = useCallback((input: EntryInput): Entry => {
        const at = new Date().toISOString();
        const created: Entry = {
            id: createId(),
            title: input.title.trim(),
            unit: input.unit.trim(),
            total: input.total,
            completed: clampCompleted(input.completed, input.total),
            createdAt: at,
            updatedAt: at,
        };

        dispatch({
            type: 'entry/create',
            entry: created,
            groupIds: input.groupIds,
            at,
        });

        return created;
    }, []);

    const updateEntry = useCallback((id: string, input: EntryInput): void => {
        const at = new Date().toISOString();
        const updated: Entry = {
            id,
            title: input.title.trim(),
            unit: input.unit.trim(),
            total: input.total,
            completed: clampCompleted(input.completed, input.total),
            // The reducer preserves the stored creation date.
            createdAt: at,
            updatedAt: at,
        };

        dispatch({
            type: 'entry/update',
            entry: updated,
            groupIds: input.groupIds,
            at,
        });
    }, []);

    const deleteEntry = useCallback((id: string) => {
        dispatch({ type: 'entry/delete', id, at: new Date().toISOString() });
    }, []);

    const setEntryProgress = useCallback((id: string, completed: number) => {
        dispatch({
            type: 'entry/progress',
            id,
            completed,
            at: new Date().toISOString(),
        });
    }, []);

    const createGroup = useCallback((input: GroupInput): Group => {
        const at = new Date().toISOString();
        const created: Group = {
            id: createId(),
            name: input.name.trim(),
            entryIds: Array.from(new Set(input.entryIds)),
            createdAt: at,
            updatedAt: at,
        };

        dispatch({ type: 'group/create', group: created });

        return created;
    }, []);

    const renameGroup = useCallback((id: string, name: string) => {
        dispatch({
            type: 'group/rename',
            id,
            name: name.trim(),
            at: new Date().toISOString(),
        });
    }, []);

    const deleteGroup = useCallback((id: string) => {
        dispatch({ type: 'group/delete', id });
    }, []);

    const addEntriesToGroup = useCallback((id: string, entryIds: string[]) => {
        dispatch({
            type: 'group/add-entries',
            id,
            entryIds,
            at: new Date().toISOString(),
        });
    }, []);

    const removeEntryFromGroup = useCallback((id: string, entryId: string) => {
        dispatch({
            type: 'group/remove-entry',
            id,
            entryId,
            at: new Date().toISOString(),
        });
    }, []);

    const resetData = useCallback(() => {
        dispatch({ type: 'data/reset', data: createSeedData() });
    }, []);

    const entryGroups = useCallback(
        (entryId: string) =>
            state.groups.filter((group) => group.entryIds.includes(entryId)),
        [state.groups],
    );

    const units = useMemo(
        () =>
            Array.from(
                new Set(state.entries.map((entry) => entry.unit.trim())),
            )
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b)),
        [state.entries],
    );

    const value = useMemo<AppDataContextValue>(
        () => ({
            ...state,
            createEntry,
            updateEntry,
            deleteEntry,
            setEntryProgress,
            createGroup,
            renameGroup,
            deleteGroup,
            addEntriesToGroup,
            removeEntryFromGroup,
            resetData,
            entryGroups,
            units,
        }),
        [
            state,
            createEntry,
            updateEntry,
            deleteEntry,
            setEntryProgress,
            createGroup,
            renameGroup,
            deleteGroup,
            addEntriesToGroup,
            removeEntryFromGroup,
            resetData,
            entryGroups,
            units,
        ],
    );

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    );
}

export function useAppData(): AppDataContextValue {
    const context = useContext(AppDataContext);

    if (!context) {
        throw new Error('useAppData must be used inside AppDataProvider');
    }

    return context;
}
