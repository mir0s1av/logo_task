import { S3Service } from '@app/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { LogoRepository } from '../logo/logo.repository';
import { UploadFileResponse } from '@app/common/types';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly logoRepository: LogoRepository,
  ) {}
  async uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
    const [url, error] = await this.s3Service.upload({
      fileName: file.originalname,
      file: file.buffer,
    });

    if (error) {
      throw new InternalServerErrorException(error);
    }

    try {
      const result = await this.logoRepository.create(url);
      return { status: 'success', body: { ...result, url } };
    } catch (error) {
      return { status: 'error', body: error };
    }
  }
}
