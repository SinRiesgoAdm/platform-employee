import { clientHttp } from '@/shared/api/client.ts';
import type {
    UploadProfileDocumentRequest,
    UploadProfileDocumentResponse,
} from '@/features/profile/types/profile-documents.ts';

export const uploadProfileDocumentAction = async ({
    documentId,
    file,
}: UploadProfileDocumentRequest): Promise<UploadProfileDocumentResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await clientHttp.post<UploadProfileDocumentResponse>(
        `/profile/documents/upload/${documentId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );

    return data;
};
