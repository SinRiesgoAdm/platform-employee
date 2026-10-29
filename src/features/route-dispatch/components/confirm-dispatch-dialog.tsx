import { Flag, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus.ts';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog.tsx';
import { useConfirmRouteDispatch } from '@/features/route-dispatch/hooks/useConfirmRouteDispatch.ts';
import type { RouteDispatchResponse } from '@/features/route-dispatch/types/route-dispatch-res.ts';
import { getRouteName } from '@/features/route-dispatch/utils/dispatch.ts';

interface Props {
    dispatch: RouteDispatchResponse | null;
    onClose: () => void;
}

export const ConfirmDispatchDialog = ({ dispatch, onClose }: Props) => {
    const confirmDispatch = useConfirmRouteDispatch();
    const isOnline = useOnlineStatus();

    const handleConfirm = async () => {
        if (!dispatch) return;
        await confirmDispatch.mutateAsync(dispatch.id);
        onClose();
    };

    return (
        <Dialog
            open={dispatch !== null}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-display tracking-tight">
                        Confirmar despacho
                    </DialogTitle>
                    <DialogDescription>
                        {dispatch
                            ? `¿Confirmas el despacho de la ruta ${getRouteName(dispatch)} con el vehículo ${dispatch.plate}?`
                            : null}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={confirmDispatch.isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={confirmDispatch.isPending || !isOnline}
                    >
                        {isOnline ? (
                            <Flag className="h-4 w-4" />
                        ) : (
                            <WifiOff className="h-4 w-4" />
                        )}
                        {confirmDispatch.isPending
                            ? 'Confirmando...'
                            : isOnline
                              ? 'Confirmar despacho'
                              : 'Sin conexión'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
