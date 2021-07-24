import { Global, HttpModule, Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      expandVariables: true,
    }),
    HttpModule,
  ],
  providers: [AppService, MailService],
  exports: [AppService, MailService, HttpModule],
})
export class SharedModule {}
