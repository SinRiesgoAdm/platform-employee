// Tarjeta del perfil: estado de las notificaciones, botón para activarlas
// y botón para enviarte una prueba. El permiso SIEMPRE se pide desde
// aquí (click), nunca al cargar la página.

import {
    Bell,
    BellOff,
    BellRing,
    RefreshCw,
    Send,
    Smartphone,
    TriangleAlert,
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';
import { usePushNotifications } from '@/features/notifications/hooks/usePushNotifications.ts';
import { cn } from '@/shared/utils/cn.ts';

const STATUS_COPY = {
    loading: {
        label: 'Verificando…',
        description: 'Revisando el estado de las notificaciones.',
    },
    pending: {
        label: 'Pendientes',
        description:
            'Diste el permiso, pero no pudimos registrar este dispositivo. Reintenta; también se intentará solo la próxima vez que abras la app.',
    },
    granted: {
        label: 'Activas',
        description:
            'Recibirás avisos de inspecciones, rutas y capacitaciones.',
    },
    default: {
        label: 'Inactivas',
        description:
            'Actívalas para recibir avisos importantes aunque la app esté cerrada.',
    },
    denied: {
        label: 'Bloqueadas',
        description:
            'Las bloqueaste en el navegador. Habilítalas en el candado de la barra de direcciones → Notificaciones.',
    },
    unsupported: {
        label: 'No disponibles',
        description:
            'En iPhone primero instala la app: Compartir → “Agregar a inicio”.',
    },
} as const;

const STATUS_ICON = {
    loading: Bell,
    granted: BellRing,
    pending: TriangleAlert,
    default: Bell,
    denied: BellOff,
    unsupported: Smartphone,
} as const;

export const PushNotificationsCard = () => {
    const { status, enable, sendTest, isSendingTest } = usePushNotifications();
    const copy = STATUS_COPY[status];
    const Icon = STATUS_ICON[status];

    return (
        <Card className="border-border/70 shadow-sm">
            <CardContent className="flex items-start gap-4 p-4">
                <div
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                        status === 'granted'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-primary/10 text-primary',
                    )}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">Notificaciones</p>
                        <Badge
                            variant={
                                status === 'granted' ? 'default' : 'secondary'
                            }
                        >
                            {copy.label}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {copy.description}
                    </p>
                </div>

                {status === 'default' && (
                    <Button size="sm" onClick={() => void enable()}>
                        Activar
                    </Button>
                )}

                {status === 'pending' && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void enable()}
                    >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Reintentar
                    </Button>
                )}

                {status === 'granted' && (
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={isSendingTest}
                        onClick={() => void sendTest()}
                    >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Probar
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
