import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileDocumentAction } from '@/features/profile/actions/upload-profile-document.ts';
import { PROFILE_DOCUMENTS_QUERY_KEY } from '@/features/profile/hooks/useProfileDocuments.ts';
import type { ProfileDocumentsResponse } from '@/features/profile/types/profile-documents.ts';

export const useUploadProfileDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadProfileDocumentAction,
        // El servicio responde con la URL firmada, así que se actualiza la caché sin volver a consultar
        onSuccess: ({ documentId, documentUrl }) => {
            queryClient.setQueryData<ProfileDocumentsResponse>(
                PROFILE_DOCUMENTS_QUERY_KEY,
                (previous) =>
                    previous && {
                        documents: previous.documents.map((document) =>
                            document.documentId === documentId
                                ? {
                                      ...document,
                                      isCompleted: true,
                                      documentUrl,
                                  }
                                : document,
                        ),
                    },
            );
        },
    });
};
