import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { PreOperationalCategory } from '@/features/preoperational/constants/question.ts';
import {
    PREOPERATIONAL_DEFAULT_QUANTITY,
    PREOPERATIONAL_STATUS,
    type PreoperationalStatus,
} from '@/features/preoperational/constants/status.ts';
import {
    PreoperationalContext,
    type PreoperationalItemState,
    type PreoperationalItemsMap,
} from '@/features/preoperational/context/PreoperationalContext.tsx';

interface Props {
    children: ReactNode;
    categories: PreOperationalCategory[];
}

export const PreoperationalProvider = ({ children, categories }: Props) => {
    const [items, setItems] = useState<PreoperationalItemsMap>({});
    const [comments, setComments] = useState('');

    const updateItem = useCallback(
        (itemId: number, patch: Partial<PreoperationalItemState>) => {
            setItems((prev) => ({
                ...prev,
                [itemId]: {
                    ...(prev[itemId] ?? {
                        quantity: PREOPERATIONAL_DEFAULT_QUANTITY,
                    }),
                    ...patch,
                },
            }));
        },
        [],
    );

    const setItemStatus = useCallback(
        (itemId: number, status: PreoperationalStatus) =>
            updateItem(itemId, { status }),
        [updateItem],
    );

    const setItemQuantity = useCallback(
        (itemId: number, quantity: string) => updateItem(itemId, { quantity }),
        [updateItem],
    );

    const totalItems = useMemo(
        () =>
            categories.reduce(
                (sum, category) => sum + category.items.length,
                0,
            ),
        [categories],
    );

    const answeredCount = useMemo(
        () => Object.values(items).filter((item) => item.status).length,
        [items],
    );

    const failures = useMemo(
        () =>
            Object.values(items).filter(
                (item) => item.status === PREOPERATIONAL_STATUS.bad,
            ).length,
        [items],
    );

    const isCommentMissing = failures > 0 && !comments.trim();

    const progress =
        totalItems > 0 ? Math.round((answeredCount / totalItems) * 100) : 0;

    const isComplete =
        totalItems > 0 && answeredCount === totalItems && !isCommentMissing;

    const contextValue = useMemo(
        () => ({
            categories,
            items,
            comments,
            totalItems,
            answeredCount,
            failures,
            isCommentMissing,
            progress,
            isComplete,
            setItemStatus,
            setItemQuantity,
            setComments,
        }),
        [
            categories,
            items,
            comments,
            totalItems,
            answeredCount,
            failures,
            isCommentMissing,
            progress,
            isComplete,
            setItemStatus,
            setItemQuantity,
        ],
    );

    return (
        <PreoperationalContext.Provider value={contextValue}>
            {children}
        </PreoperationalContext.Provider>
    );
};
