import { clientHttp } from '@/shared/api/client.ts';
import type { ProfileDocumentsResponse } from '@/features/profile/types/profile-documents.ts';

export const getProfileDocumentsAction =
    async (): Promise<ProfileDocumentsResponse> => {
        const { data } =
            await clientHttp.get<ProfileDocumentsResponse>(
                '/profile/documents',
            );

        return data;
    };
