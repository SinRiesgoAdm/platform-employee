import { Badge } from '@/shared/components/ui/badge.tsx';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Props {
    state: number | null;
}

export const StateTrainingComponent = ({ state }: Props) => {
    if (state == null) {
        return (
            <Badge variant="outline" className="gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                Pendiente
            </Badge>
        );
    }

    if (state > 60) {
        return (
            <Badge
                variant="outline"
                className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
                <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                Aprobado {state}%
            </Badge>
        );
    }

    return (
        <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Reprobado {state}%
        </Badge>
    );
};
