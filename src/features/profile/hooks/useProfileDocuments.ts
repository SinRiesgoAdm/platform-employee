import { useQuery } from '@tanstack/react-query';
import { getProfileDocumentsAction } from '@/features/profile/actions/get-profile-documents.ts';

export const PROFILE_DOCUMENTS_QUERY_KEY = ['profile-documents'];

export const useProfileDocuments = () => {
    return useQuery({
        queryKey: PROFILE_DOCUMENTS_QUERY_KEY,
        queryFn: getProfileDocumentsAction,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
