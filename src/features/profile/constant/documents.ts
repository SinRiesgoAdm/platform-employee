import {
    CreditCard,
    FileText,
    IdCard,
    PenLine,
    type LucideIcon,
} from 'lucide-react';

// El documento con id 4 siempre corresponde a la firma del empleado
export const SIGNATURE_DOCUMENT_ID = 4;

export const MAX_DOCUMENT_SIZE_MB = 10;

export const ALLOWED_DOCUMENT_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
];

const DOCUMENT_ICONS: Record<string, LucideIcon> = {
    cc: IdCard,
    licence: CreditCard,
    curriculum: FileText,
    firm: PenLine,
};

export const getDocumentIcon = (documentType: string): LucideIcon =>
    DOCUMENT_ICONS[documentType.toLowerCase()] ?? FileText;
