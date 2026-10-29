import { createContext, useContext } from 'react';
import type { PreOperationalCategory } from '@/features/preoperational/constants/question.ts';
import type { PreoperationalStatus } from '@/features/preoperational/constants/status.ts';

export type PreoperationalItemState = {
    status?: PreoperationalStatus;
    quantity: string;
};

export type PreoperationalItemsMap = Record<number, PreoperationalItemState>;

export interface PreoperationalAnswers {
    items: PreoperationalItemsMap;
    comments: string;
}

interface PreoperationalContextValue {
    categories: PreOperationalCategory[];
    items: PreoperationalItemsMap;
    comments: string;
    totalItems: number;
    answeredCount: number;
    failures: number;
    isCommentMissing: boolean;
    progress: number;
    isComplete: boolean;
    setItemStatus: (itemId: number, status: PreoperationalStatus) => void;
    setItemQuantity: (itemId: number, quantity: string) => void;
    setComments: (comments: string) => void;
}

export const PreoperationalContext = createContext(
    {} as PreoperationalContextValue,
);

export const usePreoperational = () => {
    const context = useContext(PreoperationalContext);
    if (!context) {
        throw new Error(
            'usePreoperational should be used within a PreoperationalProvider',
        );
    }
    return context;
};
