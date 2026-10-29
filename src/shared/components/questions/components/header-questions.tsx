import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useQuestionsPrograms } from '../context/QuestionContext';

interface Props {
    path?: string;
}

export const QuestionsProgramsHeader = ({ path = '/' }: Props) => {
    const { totalQuestionResponse, totalQuestion } = useQuestionsPrograms();
    return (
        <>
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
                <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Volver a cuestionarios"
                    >
                        <Link to={path}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                        Cuestionario
                    </span>
                    <Badge variant="secondary" className="shrink-0">
                        {totalQuestionResponse}/ {totalQuestion}
                    </Badge>
                </div>
            </header>
        </>
    );
};
