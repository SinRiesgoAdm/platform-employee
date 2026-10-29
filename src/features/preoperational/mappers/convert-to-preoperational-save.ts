import type { PreOperationalCategory } from '@/features/preoperational/constants/question.ts';
import type { PreoperationalAnswers } from '@/features/preoperational/context/PreoperationalContext.tsx';
import type {
    PreoperationalQuestionAnswer,
    PreoperationalSaveRequest,
} from '@/features/preoperational/types/preoperational-save-req.ts';

interface ConvertParams {
    date: string;
    vehicleId: number;
    categories: PreOperationalCategory[];
    answers: PreoperationalAnswers;
}

export const convertToPreoperationalSave = ({
    date,
    vehicleId,
    categories,
    answers,
}: ConvertParams): PreoperationalSaveRequest => {
    const questions: PreoperationalQuestionAnswer[] = [];

    categories.forEach((category) => {
        category.items.forEach((item) => {
            const state = answers.items[item.id];
            if (!state?.status) return;

            questions.push({
                id: item.id,
                quantity: Number(state.quantity) || 0,
                response: state.status,
            });
        });
    });

    return {
        questions,
        comments: answers.comments.trim(),
        vehicleId,
        date,
    };
};
