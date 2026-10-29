import { Badge } from '@/shared/components/ui/badge.tsx';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface props {
    state: string;
}

export const StateMachineComponent = ({ state }: props) => {
    if (state == '0') {
        return (
            <Badge variant="secondary">
                <CheckCircle2 className="h-3 w-3" />
                Operativo
            </Badge>
        );
    }
    if (state === '1') {
        return (
            <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3" />
                Fuera de Servicio
            </Badge>
        );
    }
    return (
        <Badge>
            <AlertTriangle className="h-3 w-3" />
            Con hallazgos
        </Badge>
    );
};
