import { Module } from '@nestjs/common';

import { LogoModule } from './logo/logo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LogoModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
