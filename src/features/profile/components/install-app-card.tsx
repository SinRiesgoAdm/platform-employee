// Tarjeta "Instalar la app" del perfil. Siempre visible (a diferencia del
// toast), para quien lo descartó o quiere instalar en otro equipo.

import {
    CheckCircle2,
    Download,
    MonitorSmartphone,
    PlusSquare,
    Share,
    WifiOff,
    Zap,
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';
import { useInstallPrompt } from '@/shared/hooks/useInstallPrompt.ts';
import type { InstallStatus } from '@/shared/pwa/install-prompt.ts';
import { cn } from '@/shared/utils/cn.ts';
import { titleInstallApp } from '@/i18n/locales/es';

const STATUS_COPY: Record<
    InstallStatus,
    { label: string; description: string }
> = {
    installed: {
        label: 'Instalada',
        description: 'Estás usando la app instalada. Funciona sin conexión.',
    },
    available: {
        label: 'Disponible',
        description:
            'Instálala para abrirla desde tu pantalla de inicio o escritorio.',
    },
    ios: {
        label: 'Manual',
        description: 'En iPhone y iPad se instala desde el menú Compartir.',
    },
    unavailable: {
        label: 'No disponible',
        description:
            'Ábrela en Chrome o Edge para instalarla. Si ya está instalada, usa el ícono de tu escritorio.',
    },
};

const BENEFITS = [
    { icon: WifiOff, label: 'Sin conexión' },
    { icon: Zap, label: 'Abre al instante' },
    { icon: MonitorSmartphone, label: 'Ventana propia' },
];

export const InstallAppCard = () => {
    const { status, promptInstall } = useInstallPrompt();
    const copy = STATUS_COPY[status];
    const isInstalled = status === 'installed';
    const Icon = isInstalled ? CheckCircle2 : Download;

    return (
        <Card className="border-border/70 shadow-sm">
            <CardContent className="space-y-4 p-4">
                <div className="flex items-start gap-4">
                    <div
                        className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                            isInstalled
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : 'bg-primary/10 text-primary',
                        )}
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">App {titleInstallApp}</p>
                            <Badge
                                variant={isInstalled ? 'default' : 'secondary'}
                            >
                                {copy.label}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {copy.description}
                        </p>
                    </div>

                    {status === 'available' && (
                        <Button size="sm" onClick={() => void promptInstall()}>
                            Instalar
                        </Button>
                    )}
                </div>

                {!isInstalled && (
                    <div className="flex flex-wrap gap-2">
                        {BENEFITS.map(({ icon: BenefitIcon, label }) => (
                            <span
                                key={label}
                                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                            >
                                <BenefitIcon
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                />
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                {status === 'ios' && (
                    <ol className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                1
                            </span>
                            Toca{' '}
                            <Share className="h-4 w-4" aria-label="Compartir" />{' '}
                            Compartir
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                2
                            </span>
                            Elige{' '}
                            <PlusSquare
                                className="h-4 w-4"
                                aria-hidden="true"
                            />{' '}
                            “Agregar a inicio”
                        </li>
                    </ol>
                )}
            </CardContent>
        </Card>
    );
};
