import { CheckCircle2, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import { Textarea } from '@/shared/components/ui/textarea.tsx';
import { useTerminateRouteDispatch } from '@/features/route-dispatch/hooks/useTerminateRouteDispatch.ts';
import type { TerminateDispatchRequest } from '@/features/route-dispatch/types/terminate-dispatch-req.ts';
import type { RouteDispatchResponse } from '@/features/route-dispatch/types/route-dispatch-res.ts';
import {
    getRouteName,
    nowLocalInput,
    toApiDateTime,
} from '@/features/route-dispatch/utils/dispatch.ts';

interface Props {
    dispatch: RouteDispatchResponse | null;
    onClose: () => void;
}

export const TerminateDispatchDialog = ({ dispatch, onClose }: Props) => {
    return (
        <Dialog
            open={dispatch !== null}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="sm:max-w-md">
                {dispatch ? (
                    // key: reinicia el formulario al cambiar de despacho
                    <TerminateDispatchForm
                        key={dispatch.id}
                        dispatch={dispatch}
                        onClose={onClose}
                    />
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

interface FormProps {
    dispatch: RouteDispatchResponse;
    onClose: () => void;
}

const TerminateDispatchForm = ({ dispatch, onClose }: FormProps) => {
    const terminateDispatch = useTerminateRouteDispatch();
    const isOnline = useOnlineStatus();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TerminateDispatchRequest>({
        defaultValues: { successDate: nowLocalInput(), observations: '' },
    });

    const onSubmit = async (form: TerminateDispatchRequest) => {
        await terminateDispatch.mutateAsync({
            routeId: dispatch.id,
            request: {
                successDate: toApiDateTime(form.successDate),
                observations: form.observations.trim(),
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
                <DialogTitle className="font-display tracking-tight">
                    Completar despacho
                </DialogTitle>
                <DialogDescription>
                    Registra el cierre del recorrido {getRouteName(dispatch)} (
                    {dispatch.plate}).
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-5">
                <div className="grid gap-2">
                    <Label htmlFor="successDate">
                        Ingrese fecha y hora exacta en la cual completó el
                        recorrido
                    </Label>
                    <Input
                        id="successDate"
                        type="datetime-local"
                        aria-invalid={!!errors.successDate}
                        {...register('successDate', {
                            required: 'Indica la fecha y hora de llegada.',
                        })}
                    />
                    {errors.successDate ? (
                        <p className="text-xs font-medium text-destructive">
                            {errors.successDate.message}
                        </p>
                    ) : null}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea
                        id="observations"
                        rows={4}
                        maxLength={500}
                        placeholder="Novedades del recorrido, demoras, incidentes o entregas."
                        {...register('observations')}
                    />
                </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={terminateDispatch.isPending}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={terminateDispatch.isPending || !isOnline}
                >
                    {isOnline ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        <WifiOff className="h-4 w-4" />
                    )}
                    {terminateDispatch.isPending
                        ? 'Guardando...'
                        : isOnline
                          ? 'Completar despacho'
                          : 'Sin conexión'}
                </Button>
            </DialogFooter>
        </form>
    );
};
