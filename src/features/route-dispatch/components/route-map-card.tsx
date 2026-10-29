import { Map as MapIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { isPublicUrl } from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    mapUrl: string | null;
    routeName: string;
}

export const RouteMapCard = ({ mapUrl, routeName }: Props) => {
    return (
        <Card className="mt-5 border-border/70 shadow-sm">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                <CardTitle className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
                    <MapIcon className="h-4 w-4 text-primary" />
                    Mapa de la ruta
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 sm:p-5 sm:pt-2">
                {isPublicUrl(mapUrl) ? (
                    <img
                        src={mapUrl}
                        alt={`Mapa de la ruta ${routeName}`}
                        loading="lazy"
                        className="w-full rounded-lg border border-border/70 object-contain"
                    />
                ) : (
                    <div className="grid aspect-video place-items-center rounded-lg border border-dashed border-border/70 bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                        El mapa de esta ruta no está disponible.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
