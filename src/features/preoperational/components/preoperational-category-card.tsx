import { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import { notify } from '@/shared/utils/notify.ts';
import type { PreOperationalCategory } from '@/features/preoperational/constants/question.ts';
import {
    PREOPERATIONAL_DEFAULT_QUANTITY,
    PREOPERATIONAL_STATUS,
    PREOPERATIONAL_STATUS_OPTIONS,
    type PreoperationalStatus,
} from '@/features/preoperational/constants/status.ts';
import { usePreoperational } from '@/features/preoperational/context/PreoperationalContext.tsx';

interface Props {
    category: PreOperationalCategory;
}

export const PreoperationalCategoryCard = memo(({ category }: Props) => {
    const { items, comments, setItemStatus, setItemQuantity } =
        usePreoperational();

    const handleStatusChange = (
        itemId: number,
        status: PreoperationalStatus,
    ) => {
        const isNewBad =
            status === PREOPERATIONAL_STATUS.bad &&
            items[itemId]?.status !== PREOPERATIONAL_STATUS.bad;

        if (isNewBad && !comments.trim()) {
            notify.info(
                'Marcaste un punto en mal estado',
                'Debes llenar el comentario describiendo el problema.',
            );
        }

        setItemStatus(itemId, status);
    };

    const answered = category.items.filter(
        (item) => items[item.id]?.status,
    ).length;

    return (
        <Card className="border-border/70 shadow-sm">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                        {category.category}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                        {answered}/{category.items.length}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="grid gap-3 p-4 pt-1 sm:p-5 sm:pt-2">
                {category.items.map((item) => {
                    const itemId = item.id;
                    const state = items[itemId];

                    return (
                        <div
                            key={itemId}
                            className="rounded-lg border border-border/70 p-3 sm:p-4"
                        >
                            <p className="text-sm font-medium leading-relaxed text-foreground">
                                {item.label}
                            </p>
                            <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_9rem]">
                                <div
                                    className="grid grid-cols-3 gap-2"
                                    role="radiogroup"
                                    aria-label={`Estado de: ${item.label}`}
                                >
                                    {PREOPERATIONAL_STATUS_OPTIONS.map(
                                        (option) => {
                                            const isSelected =
                                                state?.status === option.value;
                                            return (
                                                <Button
                                                    key={option.value}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={isSelected}
                                                    variant={
                                                        isSelected
                                                            ? option.value ===
                                                              PREOPERATIONAL_STATUS.bad
                                                                ? 'destructive'
                                                                : 'default'
                                                            : 'outline'
                                                    }
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            itemId,
                                                            option.value,
                                                        )
                                                    }
                                                    className="h-auto min-h-10 whitespace-normal px-2 py-2 text-xs sm:text-sm"
                                                >
                                                    {isSelected ? (
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                    ) : null}
                                                    {option.label}
                                                </Button>
                                            );
                                        },
                                    )}
                                </div>
                                <div className="grid gap-1.5">
                                    <Label
                                        htmlFor={`cantidad-${itemId}`}
                                        className="text-xs text-muted-foreground"
                                    >
                                        Cantidad
                                    </Label>
                                    <Input
                                        id={`cantidad-${itemId}`}
                                        inputMode="numeric"
                                        placeholder="0"
                                        value={
                                            state?.quantity ??
                                            PREOPERATIONAL_DEFAULT_QUANTITY
                                        }
                                        onChange={(event) =>
                                            setItemQuantity(
                                                itemId,
                                                event.target.value.replace(
                                                    /\D/g,
                                                    '',
                                                ),
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
});

PreoperationalCategoryCard.displayName = 'PreoperationalCategoryCard';
