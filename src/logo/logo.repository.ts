import { DATABASE_CLIENT } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class LogoRepository {
  constructor(@Inject(DATABASE_CLIENT) private readonly client: MongoClient) {}
  create(companyName: string, url: string) {
    return this.client.db().collection('logos').insertOne({
      companyName,
      uuid: uuidv4(),
      url,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
