import { ArrowLeft, Building2, ChevronRight, Loader2 } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/shared/components/ui/avatar.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import type { EmployeeEnterprise } from '@/features/auth/types/auth-res.ts';
import {
    titleEmployeeChangeUidLogin,
    titleEmployeeChooseEnterpriseDescriptionLogin,
    titleEmployeeEnteringLogin,
} from '@/i18n/locales/es';

interface Props {
    enterprises: EmployeeEnterprise[];
    /** Empresa con la que se está iniciando sesión (muestra el spinner). */
    selectingId: number | null;
    onSelect: (enterpriseId: number) => void;
    onBack: () => void;
}

export const EnterpriseSelector = ({
    enterprises,
    selectingId,
    onSelect,
    onBack,
}: Props) => {
    const isBusy = selectingId !== null;

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                {titleEmployeeChooseEnterpriseDescriptionLogin}
            </p>

            <ul className="space-y-2">
                {enterprises.map((enterprise) => (
                    <li key={enterprise.id}>
                        <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => onSelect(enterprise.id)}
                            className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Avatar className="size-11 rounded-lg after:rounded-lg">
                                {enterprise.avatar && (
                                    <AvatarImage
                                        src={enterprise.avatar}
                                        alt={enterprise.name}
                                        className="rounded-lg bg-white object-contain p-1"
                                    />
                                )}
                                <AvatarFallback className="rounded-lg">
                                    <Building2 className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>

                            <span className="min-w-0 flex-1 text-sm font-medium break-words text-foreground">
                                {enterprise.name}
                            </span>

                            {selectingId === enterprise.id ? (
                                <Loader2
                                    className="h-4 w-4 shrink-0 animate-spin text-primary"
                                    aria-label={titleEmployeeEnteringLogin}
                                />
                            ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isBusy}
                onClick={onBack}
                className="text-muted-foreground"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                {titleEmployeeChangeUidLogin}
            </Button>
        </div>
    );
};
