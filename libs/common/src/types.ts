export type UploadFileToS3Response = [string | null, string | null];
export type UploadFileToS3Payload = {
  fileName: string;
  file: Buffer;
};
export type UploadFileResponse = {
  status: 'success' | 'error';
  body: Record<string, any>;
};
