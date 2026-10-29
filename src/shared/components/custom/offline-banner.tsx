import { CloudOff } from 'lucide-react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';

export const OfflineBanner = () => {
    const isOnline = useOnlineStatus();

    if (isOnline) {
        return null;
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className="text-brand-foreground"
            style={{ background: 'var(--gradient-brand)' }}
        >
            <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15">
                    <CloudOff className="h-4 w-4" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1 leading-tight">
                    <p className="font-display text-sm font-semibold tracking-tight">
                        Sin conexión
                    </p>
                    <p className="text-xs opacity-80">
                        Ves datos guardados. Para enviar formularios necesitas
                        internet.
                    </p>
                </div>

                <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    Modo offline
                </span>
            </div>
        </div>
    );
};
