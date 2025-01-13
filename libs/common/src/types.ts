export type UploadResponse = [string | null, string | null];
export type UploadCreatePayload = {
  fileName: string;
  file: Buffer;
};
export type UploadFileResponse = {
  status: 'success' | 'error';
  body: Record<string, any>;
};
