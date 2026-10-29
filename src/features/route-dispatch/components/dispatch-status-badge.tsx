import { Badge } from '@/shared/components/ui/badge.tsx';
import { getDispatchStatusConfig } from '@/features/route-dispatch/constants/dispatch-status.ts';
import type { RouteDispatchStatus } from '@/features/route-dispatch/types/route-dispatch-res.ts';

interface Props {
    status: RouteDispatchStatus | null;
    className?: string;
}

export const DispatchStatusBadge = ({ status, className }: Props) => {
    const { label, variant } = getDispatchStatusConfig(status);

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
};
