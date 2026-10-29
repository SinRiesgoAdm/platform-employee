import { createElement, useRef, type ChangeEvent } from 'react';
import { Download, Loader2, RefreshCw, Upload } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { notify } from '@/shared/utils/notify.ts';

import type { ProfileDocument } from '@/features/profile/types/profile-documents.ts';
import { useUploadProfileDocument } from '@/features/profile/hooks/useUploadProfileDocument.ts';
import {
    ALLOWED_DOCUMENT_TYPES,
    getDocumentIcon,
    MAX_DOCUMENT_SIZE_MB,
} from '@/features/profile/constant/documents.ts';

interface ProfileDocumentCardProps {
    document: ProfileDocument;
}

export const ProfileDocumentCard = ({ document }: ProfileDocumentCardProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { mutate, isPending } = useUploadProfileDocument();

    const hasFile = document.isCompleted && Boolean(document.documentUrl);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
            notify.error(
                'Formato no válido',
                'Solo se permiten archivos PDF o imágenes JPG, PNG y WEBP.',
            );
            return;
        }

        if (file.size > MAX_DOCUMENT_SIZE_MB * 1024 * 1024) {
            notify.error(
                'Archivo muy pesado',
                `El archivo no puede superar los ${MAX_DOCUMENT_SIZE_MB} MB.`,
            );
            return;
        }

        mutate({ documentId: document.documentId, file });
    };

    const openPicker = () => inputRef.current?.click();

    return (
        <Card className="border-border/70 shadow-sm">
            <CardHeader className="gap-1">
                <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        {createElement(getDocumentIcon(document.documentType), {
                            className: 'h-5 w-5',
                        })}
                    </span>
                    <div className="min-w-0 flex-1">
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <span className="truncate">
                                {document.documentName}
                            </span>
                            {hasFile ? (
                                <Badge
                                    variant="secondary"
                                    className="shrink-0 text-[0.6rem]"
                                >
                                    Cargado
                                </Badge>
                            ) : (
                                <Badge
                                    variant="outline"
                                    className="shrink-0 text-[0.6rem]"
                                >
                                    Pendiente
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            PDF o imagen, máximo {MAX_DOCUMENT_SIZE_MB} MB
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <input
                    ref={inputRef}
                    type="file"
                    accept={ALLOWED_DOCUMENT_TYPES.join(',')}
                    className="hidden"
                    onChange={handleFileChange}
                />

                {hasFile ? (
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                            variant="outline"
                            className="sm:flex-1"
                            nativeButton={false}
                            render={
                                <a
                                    href={document.documentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            }
                        >
                            <Download className="h-4 w-4" />
                            Descargar documento
                        </Button>
                        <Button
                            variant="outline"
                            className="sm:flex-1"
                            onClick={openPicker}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="h-4 w-4" />
                            )}
                            Cambiar archivo
                        </Button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={openPicker}
                        disabled={isPending}
                        className="grid w-full place-items-center gap-1 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-60"
                    >
                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        ) : (
                            <Upload className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-xs font-medium text-foreground">
                            {isPending
                                ? 'Subiendo documento...'
                                : 'Seleccionar PDF o imagen'}
                        </span>
                        <span className="text-[0.7rem] text-muted-foreground">
                            Máximo {MAX_DOCUMENT_SIZE_MB} MB
                        </span>
                    </button>
                )}
            </CardContent>
        </Card>
    );
};
