import { clientHttp } from '@/shared/api/client.ts';
import type { TrainingQuestionRequest } from '@/features/trainnig/types/training-question-req.ts';

export const saveQuestionTraining = async (
    trainingQuestionRequest: TrainingQuestionRequest,
): Promise<void> => {
    await clientHttp.post('/training/save', trainingQuestionRequest);
};
