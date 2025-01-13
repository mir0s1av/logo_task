import { IMAGE_TYPE_REGEX, MAX_FILE_SIZE } from '@app/common';
import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogoService } from './logo.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateLogoDto } from './logo.schema';

@Controller('upload')
export class UploadController {
  constructor(private readonly logoService: LogoService) {}

  @Post()
  @UsePipes(ZodValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() { companyName }: CreateLogoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: IMAGE_TYPE_REGEX }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.logoService.uploadFile(file, companyName);
  }
}
