import { CheckCircle2, Loader2, WifiOff } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    usePreoperational,
    type PreoperationalAnswers,
} from '@/features/preoperational/context/PreoperationalContext.tsx';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';

interface Props {
    onSave: (answers: PreoperationalAnswers) => void;
    isSubmitting?: boolean;
}

export const PreoperationalFooter = ({ onSave, isSubmitting }: Props) => {
    const { isComplete, totalItems, answeredCount, items, comments } =
        usePreoperational();
    const pendingItems = totalItems - answeredCount;
    const isOnline = useOnlineStatus();

    return (
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
                <CheckCircle2
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                        isComplete ? 'text-primary' : 'text-muted-foreground'
                    }`}
                />
                <div>
                    <p className="text-sm font-semibold text-foreground">
                        {isComplete
                            ? 'Inspección completa'
                            : 'Aún tienes puntos pendientes'}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {isComplete
                            ? 'Revisa los comentarios antes de enviar.'
                            : pendingItems > 0
                              ? `Te faltan ${pendingItems} puntos por verificar.`
                              : 'Agrega un comentario describiendo los puntos en mal estado.'}
                    </p>
                </div>
            </div>
            <Button
                type="button"
                onClick={() => onSave({ items, comments })}
                disabled={!isComplete || isSubmitting || !isOnline}
                className="w-full shrink-0 sm:w-auto"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                    </>
                ) : !isOnline ? (
                    <>
                        <WifiOff className="mr-2 h-4 w-4" />
                        Sin conexión
                    </>
                ) : (
                    'Enviar preoperacional'
                )}
            </Button>
        </div>
    );
};
