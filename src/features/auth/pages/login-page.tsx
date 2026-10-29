import { Check, ShieldCheck, User } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';

import loginBg from '@/assets/login-bg.jpg';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import {
    connectSecurity,
    titleApp,
    titleCCEmployee,
    titleDotApp,
    titleEmployeeAllLogin,
    titleEmployeeButtonStartLogin,
    titleEmployeeCentralDataLogin,
    titleEmployeeDescriptionsLogin,
    titleEmployeeInformationLogin,
    titleEmployeeInitSessionLogin,
    titleEmployeeOfficeLogin,
    titleEmployeeOptimizeLogin,
    titleEmployeePortalLogin,
    titleEmployeeStartDataLogin,
    titleEmployeeSystemLogin,
    titleEmployeeWelcomeLogin,
} from '@/i18n/locales/es';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { useReturnTo } from '@/shared/hooks/useReturnTo.ts';

export const LoginPage = () => {
    const navigate = useNavigate();
    const returnTo = useReturnTo();
    const { login } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(event.target as HTMLFormElement);
        const nit = formData.get('nit');

        setIsSubmitting(true);
        try {
            const isLogin = await login(nit as string);
            if (isLogin) {
                navigate(returnTo, { replace: true });
            }
        } catch {
            // El interceptor de clientHttp ya mostró el mensaje
            // (cédula no encontrada, sin conexión, servidor caído...)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-background font-sans lg:grid lg:grid-cols-[1.05fr_1fr]">
            {/* Brand panel */}
            <aside className="relative hidden overflow-hidden lg:block">
                <img
                    src={loginBg}
                    alt={titleEmployeeOfficeLogin}
                    width={1200}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="absolute inset-0 opacity-90"
                    style={{ background: 'var(--gradient-brand)' }}
                />
                <div className="relative flex h-full flex-col justify-between p-14 text-brand-foreground">
                    <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-foreground shadow-sm">
                            <BrandLogo className="h-7 w-7" />
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight">
                            {titleApp}
                            <span className="opacity-60">{titleDotApp}</span>
                        </span>
                    </div>

                    <div className="max-w-md">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] opacity-70">
                            {titleEmployeePortalLogin}
                        </p>
                        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white">
                            {titleEmployeeAllLogin}
                            <br />
                            {titleEmployeeSystemLogin}
                        </h1>
                        <p className="mt-5 text-sm leading-relaxed opacity-75">
                            {titleEmployeeDescriptionsLogin}
                        </p>
                    </div>

                    <ul className="space-y-3 text-sm opacity-80">
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 shrink-0" />
                            {titleEmployeeCentralDataLogin}
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 shrink-0" />
                            {titleEmployeeOptimizeLogin}
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 shrink-0" />
                            {titleEmployeeInformationLogin}
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Form panel */}
            <section className="flex items-center justify-center px-5 py-12 sm:px-10">
                <div className="w-full max-w-108">
                    <div className="mb-8 lg:hidden">
                        <span className="font-display text-lg font-semibold tracking-tight text-primary">
                            {titleApp}
                            <span className="text-muted-foreground">
                                {titleDotApp}
                            </span>
                        </span>
                    </div>

                    <Card className="border-border/70 shadow-sm">
                        <CardHeader>
                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                {titleEmployeeWelcomeLogin}
                            </p>
                            <CardTitle className="font-display text-3xl font-semibold tracking-tight">
                                {titleEmployeeInitSessionLogin}
                            </CardTitle>
                            <CardDescription>
                                {titleEmployeeStartDataLogin}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="usuario">
                                        {titleCCEmployee}
                                    </Label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            name="nit"
                                            id="usuario"
                                            type="text"
                                            autoComplete="username"
                                            placeholder="ej. 1020304050"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                {/*<div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="pl-9 pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={
                                                showPassword
                                                    ? 'Ocultar contraseña'
                                                    : 'Mostrar contraseña'
                                            }
                                            onClick={() =>
                                                setShowPassword((v) => !v)
                                            }
                                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>*/}

                                {/* Captcha */}
                                {/*<div className="space-y-2">
                                    <Label htmlFor="captcha">
                                        Verificación captcha
                                    </Label>
                                    <div className="flex items-stretch gap-3">
                                        <div
                                            className="grid select-none place-items-center rounded-md px-5 font-display text-xl italic tracking-[0.35em] text-brand-foreground"
                                            style={{
                                                background:
                                                    'var(--gradient-brand)',
                                            }}
                                        >
                                            7Kq4M
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            aria-label="Generar otro código"
                                            className="h-auto w-11 shrink-0"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            id="captcha"
                                            type="text"
                                            placeholder="Escribe el código"
                                            className="h-auto min-w-0 flex-1"
                                        />
                                    </div>
                                </div>*/}

                                {/* Selfie */}
                                {/*<div className="rounded-xl border border-dashed bg-secondary/60 p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                            <Camera className="h-6 w-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-foreground">
                                                Validación por selfie
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                                Obligatoria. Busca un lugar
                                                iluminado, retira gafas o gorra
                                                y mira de frente a la cámara.
                                            </p>
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="mt-3"
                                            >
                                                <Camera className="h-3.5 w-3.5" />
                                                Tomar selfie
                                            </Button>
                                        </div>
                                    </div>
                                </div>*/}

                                {/*<div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Label
                                            htmlFor="recordar"
                                            className="cursor-pointer font-normal text-muted-foreground"
                                        >
                                            Recordar usuario
                                        </Label>
                                    </div>
                                    <a
                                        href="#"
                                        className="font-medium text-primary hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>*/}

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full font-display text-brand-foreground transition-transform hover:-translate-y-0.5"
                                    style={{
                                        background: 'var(--gradient-brand)',
                                        boxShadow: 'var(--shadow-panel)',
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Ingresando...'
                                        : titleEmployeeButtonStartLogin}
                                </Button>
                            </form>

                            <Separator className="my-6" />

                            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                {connectSecurity}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
};
