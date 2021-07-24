import { Module } from '@nestjs/common';
import { NotifyService } from './services/notify.service';
import { TelegramService } from './services/telegram.service';

@Module({
  providers: [NotifyService, TelegramService],
  exports: [NotifyService, TelegramService],
})
export class NotifyModule {}
