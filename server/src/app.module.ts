import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const dbName: string = process.env.DATABASE_NAME || 'easyGenerator';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${dbName}`),
    UserModule
  ],
})
export class AppModule {};
