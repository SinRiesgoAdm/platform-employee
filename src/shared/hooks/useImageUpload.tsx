import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import * as React from 'react';
import { notify } from '@/shared/utils/notify.ts';

interface UseImageUploadOptions<T> {
    maxSizeMB?: number;
    allowedTypes?: string[];
    onUpload: (file: File) => Promise<T>;
}

interface UseImageUploadReturn<T> {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    previewUrl: string | null;
    isUploading: boolean;
    triggerSelect: () => void;
    handleFileChange: (
        event: ChangeEvent<HTMLInputElement>,
    ) => Promise<T | undefined>;
    clearImage: () => void;
}

const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const useImageUpload = <T = void,>({
    maxSizeMB = 5,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    onUpload,
}: UseImageUploadOptions<T>): UseImageUploadReturn<T> => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const triggerSelect = () => {
        fileInputRef.current?.click();
    };

    const clearImage = () => {
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = async (
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<T | undefined> => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!allowedTypes.includes(file.type)) {
            notify.error('Formato no válido', {
                description: 'Solo se permiten imágenes JPG, PNG y WEBP.',
            });
            event.target.value = '';
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            notify.error('Archivo muy pesado', {
                description: `La imagen no puede superar los ${maxSizeMB} MB.`,
            });
            event.target.value = '';
            return;
        }

        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        try {
            setIsUploading(true);
            const result = await onUpload(file);

            notify.success('Foto de perfil actualizada', {});
            return result;
        } catch (error) {
            console.log(error);
            notify.error('Error al guardar', {
                description: 'No se pudo subir la foto. Inténtalo de nuevo.',
            });

            clearImage();
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    return {
        fileInputRef,
        previewUrl,
        isUploading,
        triggerSelect,
        handleFileChange,
        clearImage,
    };
};
