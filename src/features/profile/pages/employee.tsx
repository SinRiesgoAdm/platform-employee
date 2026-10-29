import { useRef, useState } from 'react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';
import {
    ArrowLeft,
    Camera,
    IdCard,
    Loader2,
    WifiOff,
    Pencil,
    Save,
    ShieldCheck,
    X,
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

import { useProfileEmployee } from '@/features/profile/hooks/useProfileEmployee.tsx';
import { EmployeeProfileInfo } from '@/features/profile/components/employee-profile-info.tsx';
import { InstallAppCard } from '@/features/profile/components/install-app-card.tsx';
import { PushNotificationsCard } from '@/features/notifications/components/push-notifications-card.tsx';
import { logoutWithPushCleanup } from '@/features/notifications/utils/logout-with-push.ts';

import { useImageUpload } from '@/shared/hooks/useImageUpload.tsx';
import { userInitials } from '@/features/profile/utils/utils.ts';
import { uploadAvatarAction } from '@/features/profile/actions/update-photo-profile-action.ts';
import type { UploadPhotoProfile } from '@/features/profile/types/upload-photo-profile-res.ts';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import {
    EmployeeProfileEdit,
    type EmployeeProfileEditRef,
} from '@/features/profile/components/employee-profile-edit.tsx';

const ProfileEmployeePage = () => {
    const [edition, setEdition] = useState(false);
    const profileQuery = useProfileEmployee();
    const { updateAvatar, getAvatar } = useAuthStore();

    const employeeFormRef = useRef<EmployeeProfileEditRef>(null);

    const {
        fileInputRef,
        previewUrl,
        isUploading,
        triggerSelect,
        handleFileChange,
    } = useImageUpload<UploadPhotoProfile>({
        maxSizeMB: 5,

        onUpload: async (file) => {
            const res = await uploadAvatarAction(file);
            updateAvatar(res.cdnUrl);

            return res;
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const isOnline = useOnlineStatus();

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await employeeFormRef.current?.submit();
        } finally {
            setIsLoading(false);
        }
    };

    const activePhoto = previewUrl || getAvatar() || '';

    return (
        <QueryState query={profileQuery}>
            {(employeeProfileResponse) => (
                <main className="min-h-screen bg-background font-sans pb-14">
                    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                        <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Volver al panel"
                            >
                                <Link to="/">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>

                            <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                                Mi perfil
                            </span>

                            {edition ? (
                                <div className="flex shrink-0 gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEdition(false)}
                                    >
                                        <X className="h-4 w-4" />

                                        <span className="hidden sm:inline">
                                            Cancelar
                                        </span>
                                    </Button>
                                    <>
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
                                    </>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => setEdition(true)}
                                    variant="outline"
                                    size="sm"
                                    className="shrink-0"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Editar
                                </Button>
                            )}
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
                                                employeeProfileResponse.name,
                                            )}
                                        </AvatarFallback>
                                    </Avatar>

                                    <Button
                                        type="button"
                                        size="icon"
                                        disabled={isUploading}
                                        onClick={triggerSelect}
                                        className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full shadow-md transition-transform active:scale-95"
                                        aria-label="Cambiar foto de perfil"
                                    >
                                        {isUploading ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                                        ) : (
                                            <Camera className="h-4 w-4 text-primary-foreground" />
                                        )}
                                    </Button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <h1 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                        {employeeProfileResponse.name}
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
                                    {employeeProfileResponse.positionName} -{' '}
                                    {employeeProfileResponse.temporalTemp}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="gap-1">
                                        <IdCard className="h-3 w-3" />
                                        CC {employeeProfileResponse.uid || '—'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {edition ? (
                                <EmployeeProfileEdit
                                    ref={employeeFormRef}
                                    employeeProfileResponse={
                                        employeeProfileResponse
                                    }
                                />
                            ) : (
                                <EmployeeProfileInfo
                                    employeeProfileResponse={
                                        employeeProfileResponse
                                    }
                                />
                            )}
                        </div>

                        <Separator className="mt-7" />

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            {edition ? (
                                <>
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
                                </>
                            ) : null}

                            <Button
                                onClick={() => void logoutWithPushCleanup()}
                                variant="destructive"
                                className="sm:w-auto"
                            >
                                Cerrar sesión
                            </Button>
                        </div>

                        <div className="mt-6 space-y-3">
                            <InstallAppCard />
                            <PushNotificationsCard />
                        </div>
                    </div>
                </main>
            )}
        </QueryState>
    );
};

export default ProfileEmployeePage;
