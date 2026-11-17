import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { ReactNode } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';
import { XIcon } from 'lucide-react';
import { cn } from 'cn';

interface ToastMessage {
    id: string;
    title: string;
    description?: string;
}

interface ToastContextValue {
    toast: (message: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback((message: Omit<ToastMessage, 'id'>) => {
        const id =
            globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());

        setToasts((current) => [...current, { id, ...message }]);
    }, []);

    const value = useMemo(() => ({ toast }), [toast]);

    return (
        <ToastContext.Provider value={value}>
            <ToastPrimitive.Provider swipeDirection="right">
                {children}
                {toasts.map((item) => (
                    <ToastPrimitive.Root
                        key={item.id}
                        open
                        duration={3200}
                        onOpenChange={(open) => {
                            if (!open) {
                                dismiss(item.id);
                            }
                        }}
                        className={cn(
                            'bg-card text-card-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[swipe=end]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg',
                        )}
                    >
                        <div className="grid flex-1 gap-1">
                            <ToastPrimitive.Title className="text-sm font-semibold">
                                {item.title}
                            </ToastPrimitive.Title>
                            {item.description && (
                                <ToastPrimitive.Description className="text-muted-foreground text-sm">
                                    {item.description}
                                </ToastPrimitive.Description>
                            )}
                        </div>
                        <ToastPrimitive.Close
                            aria-label="Dismiss notification"
                            className="text-muted-foreground hover:text-foreground rounded-md p-0.5 transition-colors"
                        >
                            <XIcon className="size-4" />
                        </ToastPrimitive.Close>
                    </ToastPrimitive.Root>
                ))}
                <ToastPrimitive.Viewport className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] mx-auto flex w-full max-w-md flex-col gap-2 p-4 outline-none" />
            </ToastPrimitive.Provider>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used inside ToastProvider');
    }

    return context;
}
