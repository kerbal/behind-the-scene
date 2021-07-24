import { ErrorDocument } from '@/modules/errors/schema/error.schema';
import { ProjectDocument } from '@/modules/projects/schema/project.schema';
import { MailService } from '@/modules/shared/services/mail.service';
import { UserDocument } from '@/modules/users/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class NotifyService {
  constructor(private telegramService: TelegramService, private mailService: MailService) {}

  async notifyError(error: ErrorDocument, project: ProjectDocument, members: UserDocument[]) {
    try {
      const populatedError = await error.populate('Project').execPopulate();
      const { telegramChatId } = project;
      if (telegramChatId) {
        await this.telegramService.sendError(telegramChatId, populatedError, project);
      }
      this.sendErrorToEmail(populatedError, members);
      //Chain slack and others here

      return populatedError;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async sendErrorToEmail(error: ErrorDocument, members: UserDocument[]) {
    try {
      const emailContent = [
        `## ${error.name}`,
        error.message + '\n',
        `**URL:** ${error.source}`,
        `\`\`\``,
        error.stack,
        `\`\`\``,
        `**Browser name:** ${error.browserName}\n`,
        `**Browser version:** ${error.browserVersion}\n`,
        '--\n',
        `**Os name:** ${error.osName}\n`,
        `**Os version:** ${error.osVersion}`,
      ].join('\n');
      await this.mailService.sendMail(members.map(member => member.email), '[Behind The Scene] ' + error.name, emailContent);
    } catch (err) {
      console.log(err);
    }
  }
}
