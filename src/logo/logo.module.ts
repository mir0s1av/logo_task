import { Module, ModuleMetadata } from '@nestjs/common';
import { UploadController } from './logo.controller';
import { S3Module } from '@app/common/s3/s3.module';
import { LogoService } from './logo.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from '@app/common';
import { LogoRepository } from './logo.repository';

const moduleMetadata: ModuleMetadata = {
  imports: [
    DatabaseModule,
    S3Module,
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: 2,
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [
    LogoRepository,
    LogoService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
};

@Module(moduleMetadata)
export class LogoModule {}
