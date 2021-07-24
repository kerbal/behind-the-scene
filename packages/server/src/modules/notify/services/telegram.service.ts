import { ErrorDocument } from '@/modules/errors/schema/error.schema';
import { ProjectDocument } from '@/modules/projects/schema/project.schema';
import { AppService } from '@/modules/shared/services/app.service';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private BOT_TOKEN: string;
  private TELEGRAM_BOT_API: string;
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {
    const { botToken, apiBotURL } = appService.getTelegramConfig();
    this.BOT_TOKEN = botToken;
    this.TELEGRAM_BOT_API = apiBotURL;
  }

  async sendMessage(chatId: string, text: string, mode: string = 'MarkdownV2') {
    const query = new URLSearchParams({
      chat_id: chatId,
      text,
      parse_mode: mode,
    }).toString();
    const res = await this.httpService
      .get(`${this.TELEGRAM_BOT_API}/sendMessage?${query}`)
      .toPromise();
    return res;
  }

  async sendError(chatId: string, populatedError: ErrorDocument, project: ProjectDocument) {
    const { message, _id, projectId } = populatedError;
    const { name } = project;
    const host = this.appService.getCurrentHost();
    const text = [
      `\\[BTS\\] ${name} error: *${message}*`,
      '',
      `${host}/errors/${_id}`,
    ];
    const sendMessage = text.join('\n');
    return this.sendMessage(chatId, sendMessage);
  }

  async sendWelcome(chatId: string, project: ProjectDocument) {
    const { name } = project;
    const text = [`\\[BTS\\] Connected with ${name}`];
    const sendMessage = text.join('\n');
    return this.sendMessage(chatId, sendMessage);
  }

  async sendGoodbye(chatId: string, project: ProjectDocument) {
    const { name } = project;
    const text = [`\\[BTS\\] Disconnected with ${name}`];
    const sendMessage = text.join('\n');
    return this.sendMessage(chatId, sendMessage);
  }
}
