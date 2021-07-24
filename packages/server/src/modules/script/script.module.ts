import { ScriptController } from './script.controller';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [],
  providers: [],
  controllers: [ScriptController],
  exports: [],
})
export class ScriptModule {}
