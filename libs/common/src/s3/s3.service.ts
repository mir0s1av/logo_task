import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadCreatePayload, UploadResponse } from '../types';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
  constructor(private readonly configService: ConfigService) {}

  // Define response type for upload function

  async upload({
    fileName,
    file,
  }: UploadCreatePayload): Promise<UploadResponse> {
    const key = `logos/${Date.now()}-${fileName}`;
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
          Key: key,
          Body: file,
        }),
      );
      // Generate the URL
      const url = this.generateS3PublicUrl(key);

      return [url, null];
    } catch (error) {
      console.error(error);
      return [null, 'Error uploading file to S3'];
    }
  }

  private generateS3PublicUrl(key: string): string {
    const bucket = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const region = this.configService.getOrThrow('AWS_S3_REGION');
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}
