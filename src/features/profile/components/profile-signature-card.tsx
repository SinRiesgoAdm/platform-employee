import { useState } from 'react';
import {
    BadgeCheck,
    Download,
    Eraser,
    Loader2,
    PenLine,
    ImageOff,
    ShieldCheck,
} from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { useSignaturePad } from '@/shared/hooks/useSignaturePad.ts';

import type { ProfileDocument } from '@/features/profile/types/profile-documents.ts';
import { useUploadProfileDocument } from '@/features/profile/hooks/useUploadProfileDocument.ts';

interface ProfileSignatureCardProps {
    signature: ProfileDocument;
}

export const ProfileSignatureCard = ({
    signature,
}: ProfileSignatureCardProps) => {
    const { mutate, isPending } = useUploadProfileDocument();
    const { canvasProps, hasSignature, clear, toFile } = useSignaturePad();
    const [isRedrawing, setIsRedrawing] = useState(false);
    // Se guarda la URL que falló (no un booleano): si el empleado registra
    // una firma nueva, la URL cambia y la imagen se vuelve a intentar sola.
    const [failedUrl, setFailedUrl] = useState<string | null>(null);
    const imageFailed = failedUrl === signature.documentUrl;

    const hasStoredSignature =
        signature.isCompleted && Boolean(signature.documentUrl);
    const showPad = !hasStoredSignature || isRedrawing;

    const handleSave = async () => {
        const file = await toFile();
        if (!file) return;

        mutate(
            { documentId: signature.documentId, file },
            {
                onSuccess: () => {
                    clear();
                    setIsRedrawing(false);
                },
            },
        );
    };

    return (
        <>
            <div className="mt-8 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    Firma digital
                </h2>
                {hasStoredSignature ? (
                    <Badge variant="secondary" className="shrink-0">
                        <BadgeCheck className="h-3 w-3" />
                        Registrada
                    </Badge>
                ) : (
                    <Badge variant="outline" className="shrink-0">
                        Pendiente
                    </Badge>
                )}
            </div>
            <Separator className="mt-3" />

            <Card className="mt-4 border-border/70 shadow-sm">
                <CardHeader className="gap-1">
                    <div className="flex items-start gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <PenLine className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                            <CardTitle className="text-sm">
                                {showPad ? 'Traza tu firma' : 'Tu firma'}
                            </CardTitle>
                            <CardDescription className="text-xs">
                                {showPad
                                    ? 'Usa el dedo en el móvil o el mouse en el computador. Esta firma se usará para firmar tus documentos.'
                                    : 'Esta es la firma registrada que se usa para firmar tus documentos.'}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    {showPad ? (
                        <>
                            <div className="relative rounded-lg border border-dashed border-border bg-muted/20">
                                <canvas
                                    {...canvasProps}
                                    width={900}
                                    height={300}
                                    className="h-40 w-full touch-none rounded-lg sm:h-52"
                                />
                                {!hasSignature ? (
                                    <p className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                                        Firma aquí
                                    </p>
                                ) : null}
                                <div className="pointer-events-none absolute right-6 bottom-6 left-6 border-b border-border/70" />
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <Button
                                    variant="outline"
                                    onClick={
                                        hasStoredSignature && !hasSignature
                                            ? () => setIsRedrawing(false)
                                            : clear
                                    }
                                    disabled={
                                        isPending ||
                                        (!hasSignature && !hasStoredSignature)
                                    }
                                >
                                    <Eraser className="h-4 w-4" />
                                    {hasStoredSignature && !hasSignature
                                        ? 'Cancelar'
                                        : 'Borrar'}
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={!hasSignature || isPending}
                                >
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ShieldCheck className="h-4 w-4" />
                                    )}
                                    {isPending
                                        ? 'Guardando...'
                                        : 'Guardar firma'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid h-40 place-items-center rounded-lg border border-border bg-muted/20 p-3 sm:h-52">
                                {imageFailed ? (
                                    <p className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                                        <ImageOff
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                        La imagen de tu firma no está
                                        disponible. Vuelve a registrarla.
                                    </p>
                                ) : (
                                    <img
                                        src={signature.documentUrl}
                                        alt="Firma registrada"
                                        className="max-h-full max-w-full object-contain"
                                        onError={() =>
                                            setFailedUrl(signature.documentUrl)
                                        }
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <Button
                                    variant="outline"
                                    nativeButton={false}
                                    render={
                                        <a
                                            href={signature.documentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    }
                                >
                                    <Download className="h-4 w-4" />
                                    Descargar firma
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsRedrawing(true)}
                                >
                                    <PenLine className="h-4 w-4" />
                                    Volver a firmar
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
