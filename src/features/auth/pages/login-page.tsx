import { Check, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';

import loginBg from '@/assets/login-bg.jpg';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import {
    connectSecurity,
    titleApp,
    titleDotApp,
    titleEmployeeAllLogin,
    titleEmployeeCentralDataLogin,
    titleEmployeeChooseEnterpriseLogin,
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
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useReturnTo } from '@/shared/hooks/useReturnTo.ts';
import { useEmployeeEnterprises } from '@/features/auth/hooks/useEmployeeEnterprises.ts';
import { useLoginEmployee } from '@/features/auth/hooks/useLoginEmployee.ts';
import { LoginUidForm } from '@/features/auth/components/login-uid-form.tsx';
import { EnterpriseSelector } from '@/features/auth/components/enterprise-selector.tsx';

export const LoginPage = () => {
    const navigate = useNavigate();
    const returnTo = useReturnTo();
    const [uid, setUid] = useState('');
    const enterprisesMutation = useEmployeeEnterprises();
    const loginMutation = useLoginEmployee();

    // Los errores (cédula no encontrada, sin conexión...) ya los muestra el
    // interceptor de clientHttp; aquí solo se decide el siguiente paso.
    const loginWithEnterprise = (employeeUid: string, enterpriseId: number) => {
        loginMutation.mutate(
            { uid: employeeUid, enterpriseId },
            { onSuccess: () => navigate(returnTo, { replace: true }) },
        );
    };

    const handleUidSubmit = (employeeUid: string) => {
        setUid(employeeUid);
        enterprisesMutation.mutate(employeeUid, {
            onSuccess: (enterprises) => {
                // Con una sola empresa no hay nada que elegir
                if (enterprises.length === 1) {
                    loginWithEnterprise(employeeUid, enterprises[0].id);
                }
            },
        });
    };

    const handleBack = () => {
        enterprisesMutation.reset();
        loginMutation.reset();
    };

    const enterprises = enterprisesMutation.data ?? [];
    const isChoosingEnterprise = enterprises.length > 1;
    const selectingId = loginMutation.isPending
        ? (loginMutation.variables?.enterpriseId ?? null)
        : null;

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
                                {isChoosingEnterprise
                                    ? titleEmployeeChooseEnterpriseLogin
                                    : titleEmployeeInitSessionLogin}
                            </CardTitle>
                            {!isChoosingEnterprise && (
                                <CardDescription>
                                    {titleEmployeeStartDataLogin}
                                </CardDescription>
                            )}
                        </CardHeader>

                        <CardContent>
                            {isChoosingEnterprise ? (
                                <EnterpriseSelector
                                    enterprises={enterprises}
                                    selectingId={selectingId}
                                    onSelect={(enterpriseId) =>
                                        loginWithEnterprise(uid, enterpriseId)
                                    }
                                    onBack={handleBack}
                                />
                            ) : (
                                <LoginUidForm
                                    defaultUid={uid}
                                    isSubmitting={
                                        enterprisesMutation.isPending ||
                                        loginMutation.isPending
                                    }
                                    onSubmit={handleUidSubmit}
                                />
                            )}

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
