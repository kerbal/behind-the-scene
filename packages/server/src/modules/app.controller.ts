import { AppInfo } from '@/common/classes/App.class';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './shared/services/app.service';
import { MailService } from './shared/services/mail.service';
import { UsersService } from './users/users.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly userService: UsersService,
  ) // private readonly mailService: MailService,
  {}

  @ApiOperation({ summary: 'check API' })
  @ApiOkResponse({ type: AppInfo, description: 'Return AppInfo' })
  @Get()
  async getHello() {
    // this.mailService.test('huynonstop123nt@gmail.com')
    // this.appService.isDevEnv() && await this.userService.syncIndexers();
    return {
      message: this.appService.Hello,
      env: this.appService.getEnvironment(),
      docker: this.appService.isDocker(),
      database: this.appService.isDevEnv()
        ? this.appService.getDbURL()
        : undefined,
      port: this.appService.get('PORT') || 3000,
    };
  }
}
