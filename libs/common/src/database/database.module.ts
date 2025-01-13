import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { DATABASE_CLIENT } from '../utils';

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: DATABASE_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const client = new MongoClient(
          configService.getOrThrow('DATABASE_URL'),
        );
        await client.connect();
        console.log('Connected to database');
        return client;
      },
    },
  ],
  exports: [DATABASE_CLIENT],
})
export class DatabaseModule {}
