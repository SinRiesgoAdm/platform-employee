import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';

import { useProfileDocuments } from '@/features/profile/hooks/useProfileDocuments.ts';
import { ProfileDocumentCard } from '@/features/profile/components/profile-document-card.tsx';
import { ProfileSignatureCard } from '@/features/profile/components/profile-signature-card.tsx';
import { SIGNATURE_DOCUMENT_ID } from '@/features/profile/constant/documents.ts';

export const ProfileDocumentsPage = () => {
    const documentsQuery = useProfileDocuments();

    return (
        <main className="min-h-screen bg-background pb-14 font-sans">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Volver al panel"
                        nativeButton={false}
                        render={<Link to="/" />}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                        Mis documentos
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                <div
                    className="rounded-xl p-4 text-brand-foreground sm:p-6"
                    style={{ background: 'var(--gradient-brand)' }}
                >
                    <p className="text-[0.65rem] font-medium tracking-[0.24em] uppercase opacity-75">
                        Expediente del empleado
                    </p>
                    <h1 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                        Carga de documentos y firma digital
                    </h1>
                    <p className="mt-2 max-w-xl text-sm opacity-85">
                        Adjunta tus documentos en PDF o imagen (máx. 10 MB cada
                        uno) y registra tu firma digital trazándola con el dedo
                        o el mouse.
                    </p>
                </div>

                <QueryState query={documentsQuery}>
                    {({ documents }) => {
                        const signature = documents.find(
                            (d) => d.documentId === SIGNATURE_DOCUMENT_ID,
                        );
                        const files = documents.filter(
                            (d) => d.documentId !== SIGNATURE_DOCUMENT_ID,
                        );
                        const completed = files.filter(
                            (d) => d.isCompleted,
                        ).length;

                        return (
                            <>
                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                        Documentos
                                    </h2>
                                    <Badge
                                        variant="secondary"
                                        className="shrink-0"
                                    >
                                        {completed}/{files.length} cargados
                                    </Badge>
                                </div>
                                <Separator className="mt-3" />

                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {files.map((document) => (
                                        <ProfileDocumentCard
                                            key={document.documentId}
                                            document={document}
                                        />
                                    ))}
                                </div>

                                {signature ? (
                                    <ProfileSignatureCard
                                        signature={signature}
                                    />
                                ) : null}
                            </>
                        );
                    }}
                </QueryState>

                <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Tus documentos se tratan conforme a la política de datos de
                    sinriesgo.co
                </p>
            </div>
        </main>
    );
};
