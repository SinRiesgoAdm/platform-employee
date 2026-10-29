import { Button } from '@/shared/components/ui/button';
import { CheckCircle2, Loader2, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';
import {
    type AnswersMap,
    useQuestionsPrograms,
} from '../context/QuestionContext';

interface props {
    onSave: (answers: AnswersMap) => void;
    isSubmitting?: boolean;
    isTerminated?: boolean;
    isHidden?: boolean;
}

export const QuestionsProgramsFooter = ({
    onSave,
    isSubmitting,
    isTerminated,
    isHidden,
}: props) => {
    const { isComplete, totalQuestion, totalQuestionResponse, answers } =
        useQuestionsPrograms();
    const isOnline = useOnlineStatus();

    return (
        <>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-3">
                    <CheckCircle2
                        className={`mt-0.5 h-5 w-5 shrink-0 ${isComplete ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    {isHidden ? (
                        <>
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    Cuestionario completo
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Completastes todas las preguntas solo puedes
                                    revisarlas.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    {isComplete
                                        ? 'Cuestionario completo'
                                        : 'Aún tienes preguntas pendientes'}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {isComplete
                                        ? 'Revisa tus respuestas antes de finalizar.'
                                        : `Te faltan ${totalQuestion - totalQuestionResponse} respuestas por seleccionar.`}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <Button
                    hidden={isHidden}
                    type="button"
                    onClick={() => onSave(answers)}
                    disabled={!isComplete || isSubmitting || !isOnline}
                    className="w-full shrink-0 sm:w-auto"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                            Guardando...
                        </>
                    ) : !isOnline ? (
                        <>
                            <WifiOff className="mr-2 h-4 w-4" />
                            Sin conexión
                        </>
                    ) : (
                        <>
                            {isTerminated
                                ? 'Finalizar cuestionario'
                                : 'Guardar Respuestas'}
                        </>
                    )}
                </Button>
            </div>
        </>
    );
};
