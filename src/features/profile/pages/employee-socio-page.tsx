import { useRef, useState } from 'react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';
import {
    ArrowLeft,
    IdCard,
    Loader2,
    Save,
    ShieldCheck,
    WifiOff,
} from 'lucide-react';

import { Link } from 'react-router';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/shared/components/ui/avatar.tsx';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Separator } from '@base-ui/react/separator';

import { userInitials } from '@/features/profile/utils/utils.ts';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';

import { useProfileEmployeeExtend } from '@/features/profile/hooks/useEmployeeExtend.ts';
import {
    EmployeeSocioeconomicEdit,
    type SocioeconomicEditRef,
} from '@/features/profile/components/employee-socio-demo.tsx';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

const EmployeeExtendPage = () => {
    const employeeExtend = useProfileEmployeeExtend();
    const store = useAuthStore();
    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    const employeeFormRef = useRef<SocioeconomicEditRef>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isOnline = useOnlineStatus();

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await employeeFormRef.current?.submit();
            invalidateDashboard();
        } finally {
            setIsLoading(false);
        }
    };

    const activePhoto = store.getAvatar() || '';

    return (
        <QueryState query={employeeExtend}>
            {(employeeExtendResponse) => (
                <main className="min-h-screen bg-background font-sans pb-14">
                    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                        <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Volver al panel"
                            >
                                <Link to="/dashboard/batteries">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>

                            <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                                Datos Adcionales
                            </span>

                            <div className="flex shrink-0 gap-2">
                                <Button
                                    size="sm"
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isLoading || !isOnline}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : !isOnline ? (
                                        <>
                                            <WifiOff className="h-4 w-4" />
                                            Sin conexión
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Guardar
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                        <Card className="overflow-hidden border-border/70 p-0 shadow-sm">
                            <div
                                className="h-24 sm:h-32"
                                style={{
                                    background: 'var(--gradient-brand)',
                                }}
                            />

                            <CardContent className="-mt-10 p-4 sm:p-6">
                                <div className="relative w-fit">
                                    <Avatar className="h-24 w-24 overflow-hidden border-4 border-card shadow-sm">
                                        {activePhoto ? (
                                            <AvatarImage
                                                src={activePhoto}
                                                alt="Foto de perfil"
                                                className="object-cover"
                                            />
                                        ) : null}

                                        <AvatarFallback className="bg-secondary text-xl font-semibold">
                                            {userInitials(
                                                store.getEmployeeName() ?? '',
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <h1 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                        {store.getEmployeeName() ?? ''}
                                    </h1>

                                    <Badge
                                        variant="secondary"
                                        className="shrink-0"
                                    >
                                        <ShieldCheck className="h-3 w-3" />
                                        Activo
                                    </Badge>
                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {store.getPositionName() ?? ''} -{' '}
                                    {store.getEnterpriseName() ?? ''}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="gap-1">
                                        <IdCard className="h-3 w-3" />
                                        CC {store.getEmployeeUid() ?? '—'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-5 w-full">
                            <EmployeeSocioeconomicEdit
                                ref={employeeFormRef}
                                socioeconomicData={employeeExtendResponse}
                            />
                        </div>

                        <Separator className="mt-7" />

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Button
                                type="button"
                                onClick={handleSave}
                                disabled={isLoading || !isOnline}
                                className="w-full shrink-0 sm:w-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : !isOnline ? (
                                    <>
                                        <WifiOff className="mr-2 h-4 w-4" />
                                        Sin conexión
                                    </>
                                ) : (
                                    'Guardar cambios'
                                )}
                            </Button>
                        </div>
                    </div>
                </main>
            )}
        </QueryState>
    );
};

export default EmployeeExtendPage;
