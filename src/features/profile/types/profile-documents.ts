export interface ProfileDocument {
    documentId: number;
    documentName: string;
    documentType: string;
    isCompleted: boolean;
    documentUrl: string;
}

export interface ProfileDocumentsResponse {
    documents: ProfileDocument[];
}

export interface UploadProfileDocumentRequest {
    documentId: number;
    file: File;
}

export interface UploadProfileDocumentResponse {
    documentId: number;
    key: string;
    documentUrl: string;
}
