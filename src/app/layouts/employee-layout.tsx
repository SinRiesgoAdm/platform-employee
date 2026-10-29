import { ArrowLeft, Bell, LogOut, ShieldCheck, User } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';
import companyCover from '@/assets/company-cover.jpg';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Link, useLocation, useNavigate } from 'react-router';

import { Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { userInitials } from '@/features/profile/utils/utils.ts';
import { logoutWithPushCleanup } from '@/features/notifications/utils/logout-with-push.ts';

const routeBack = ['/dashboard/batteries', '/dashboard/preventive'];

const nameLabel = {
    '/dashboard/batteries': 'baterías',
    '/dashboard/preventive': 'programas preventivos',
} as const;

type DashboardRoute = keyof typeof nameLabel;

const EmployeeLayout = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const location = useLocation();

    const isRouteBack = routeBack.some((route) =>
        location.pathname.startsWith(route),
    );

    const label = nameLabel[location.pathname as DashboardRoute] ?? '';

    return (
        <>
            <main className="min-h-screen bg-background font-sans pb-14">
                <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
                        {isRouteBack ? (
                            <div className="flex items-center gap-2 min-w-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Volver al panel"
                                    className="shrink-0"
                                >
                                    <Link to="/">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                                    {label}
                                </span>
                            </div>
                        ) : (
                            <Link
                                to="/"
                                className="flex min-w-0 items-center gap-2"
                            >
                                <BrandLogo className="h-8 w-8" />
                                <span className="truncate font-display text-base font-semibold tracking-tight text-primary">
                                    sinriesgo
                                    <span className="text-muted-foreground">
                                        .co
                                    </span>
                                </span>
                            </Link>
                        )}

                        {/* Derecha: Notificaciones y Menú de usuario */}
                        <div className="flex shrink-0 items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Notificaciones"
                            >
                                <Bell className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    aria-label="Menú de usuario"
                                    className="rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <Avatar className="h-8 w-8">
                                        {authStore.getAvatar() ? (
                                            <AvatarImage
                                                src={
                                                    authStore.getAvatar() ?? ''
                                                }
                                                alt="Foto de perfil"
                                                className="object-cover"
                                            />
                                        ) : null}
                                        <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                                            {userInitials(
                                                authStore.getEmployeeName() ||
                                                    '',
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <div className="grid gap-0.5 px-2 py-1.5">
                                        <span className="truncate text-sm font-semibold">
                                            {authStore.getEmployeeName()}
                                        </span>

                                        <span className="truncate text-xs text-muted-foreground">
                                            {authStore.getPositionName()}
                                        </span>
                                    </div>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() => navigate('/profile')}
                                    >
                                        <User className="h-4 w-4" />
                                        Mi perfil
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        variant="destructive"
                                        onClick={async () => {
                                            await logoutWithPushCleanup();
                                            navigate('/login');
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Cerrar sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                    {/* Company card */}
                    <Card className="overflow-hidden border-border/70 p-0 shadow-sm">
                        <div className="relative h-32 sm:h-44">
                            <img
                                src={companyCover}
                                alt="Sede principal de Transportes Andinos S.A.S."
                                width={1280}
                                height={720}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div
                                className="absolute inset-0 opacity-85"
                                style={{ background: 'var(--gradient-brand)' }}
                            />
                            <div className="relative flex h-full flex-col justify-end p-4 text-brand-foreground sm:p-6">
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                                    Empresa vinculada
                                </p>
                                <h1 className="mt-1 truncate font-display text-xl font-semibold tracking-tight sm:text-3xl">
                                    {authStore.getEnterpriseName()}
                                </h1>
                            </div>
                        </div>

                        <CardContent className="p-4 sm:p-6">
                            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                                {[
                                    {
                                        label: 'NIT',
                                        value: authStore.getEmployeeUid(),
                                    },
                                    {
                                        label: 'Sede',
                                        value: authStore.getBranchName(),
                                    },
                                    {
                                        label: 'Cargo',
                                        value: authStore.getPositionName(),
                                    },
                                    { label: 'Estado', value: 'Activo' },
                                ].map((item) => (
                                    <div key={item.label} className="min-w-0">
                                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                            {item.label}
                                        </p>
                                        <p className="mt-0.5 truncate font-medium text-foreground">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Outlet />

                    <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Sesión verificada por · sinriesgo.co
                    </p>
                </div>
            </main>
        </>
    );
};

export default EmployeeLayout;
