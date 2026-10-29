import { clientHttp } from '@/shared/api/client.ts';
import type { UploadPhotoProfile } from '@/features/profile/types/upload-photo-profile-res.ts';

export const uploadAvatarAction = async (
    file: File,
): Promise<UploadPhotoProfile> => {
    const formData = new FormData();
    formData.append('imagen', file);

    const { data } = await clientHttp.post<UploadPhotoProfile>(
        '/profile/upload',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );

    return data;
};
