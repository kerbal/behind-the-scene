import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorService } from './error.service';

import { BTSError, ErrorSchema } from './schema/error.schema';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BTSError.name, schema: ErrorSchema }]),
    NotifyModule,
  ],
  providers: [ErrorService],
  controllers: [],
  exports: [ErrorService],
})
export class ErrorsModule {}
