import { ErrorDocument } from '@/modules/errors/schema/error.schema';
import { InvitationDocument } from '@/modules/invitations/schema/invitation.schema';
import { ProjectDocument } from '@/modules/projects/schema/project.schema';
import { Injectable } from '@nestjs/common';
import * as mailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';
import Mail from 'nodemailer/lib/mailer';
import { AppService } from './app.service';

@Injectable()
export class MailService {
  private transporter: Mail;
  constructor(private appService: AppService) {
    const {
      host,
      service,
      password,
      port,
      address,
    } = appService.getEmailConfig();
    this.transporter = mailer.createTransport({
      host,
      service,
      port,
      auth: {
        user: address,
        pass: password,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
    this.transporter.use('compile', markdown());
  }
  async sendMail(to: string[], subject: string, markdown: string) {
    const { address } = this.appService.getEmailConfig();
    const options: Mail.Options & { markdown: string } = {
      from: address,
      to,
      subject,
      markdown,
    };
    try {
      const info = await this.transporter.sendMail(options);
      return {
        success: true,
        info,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async test(to: string) {
    return this.sendMail([to], 'This is a test email', '# Hello we are BTS \n');
  }

  async sendInvitation(invitation: InvitationDocument) {
    const { email, project, _id } = await invitation
      .populate('project')
      .execPopulate();
    const { name } = project as ProjectDocument;
    const hosts = this.appService.getClientHost();
    const host = hosts[hosts.length - 1];
    return this.sendMail(
      [email],
      `${name} invited you to thier project`,
      `${host}/invitations/${_id}?email=${email}`,
    );
  }
}
