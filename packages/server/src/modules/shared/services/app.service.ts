import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CONFIG,
  ENV_CONFIG,
  DB_CONFIG,
  DOCKER_CONFIG,
  NODEMAILER_CONFIG,
} from '@/common/constants';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  get Hello(): string {
    return 'Hello World!';
  }

  get<T = string>(key: string): T {
    return this.configService.get<T>(key);
  }

  getEnvironment() {
    return this.get(CONFIG.NODE_ENV) || 'development';
  }

  isDevEnv(): boolean {
    return this.isEnv(ENV_CONFIG.DEV);
  }

  isEnv(environment: string): boolean {
    return this.getEnvironment() === environment;
  }

  isDocker(): boolean {
    return !!this.get(DOCKER_CONFIG.DOCKER_ENV);
  }

  getDbURL() {
    let dbURL = this.get(DB_CONFIG.DATABASE_URL);
    if (this.isDocker()) dbURL = this.get(DOCKER_CONFIG.DOCKER_DB_URL);
    return dbURL;
  }

  getSessionConfig() {
    return {
      SECRET_KEY: this.get(CONFIG.SECRET_KEY),
      MAX_AGE: +this.get<number>(CONFIG.EXPIRATION_TIME) * 1000,
      EXPIRATION_TIME: +this.get<number>(CONFIG.EXPIRATION_TIME),
    };
  }

  getJWTConfig() {
    return {
      secret: this.get(CONFIG.SECRET_KEY),
      expiresIn: +this.get<number>(CONFIG.EXPIRATION_TIME),
    };
  }

  getEmailConfig() {
    const { SERVICE, HOST, PORT, PASS, ADDRESS } = NODEMAILER_CONFIG;
    return {
      service: this.get(SERVICE) || 'gmail',
      host: this.get(HOST) || 'smtp.gmail.com',
      port: +this.get(PORT) || 587,
      address: this.get(ADDRESS),
      password: this.get(PASS),
    };
  }

  getGithubConfig() {
    const CLIENT_ID = 'GITHUB_CLIENT_ID';
    const CLIENT_SECRET = 'GITHUB_CLIENT_SECRET';
    return {
      clientId: this.get(CLIENT_ID),
      clientSecret: this.get(CLIENT_SECRET),
      tokenUrl: 'https://github.com/login/oauth/access_token',
    };
  }

  getClientHost() {
    const hosts = [this.get('CLIENT_HOST')];
    if (this.isDevEnv()) {
      hosts.push(this.get('DEV_CLIENT_HOST'));
    }
    return hosts;
  }
  
  getCurrentHost() {
    const hosts = this.getClientHost();
    return hosts[hosts.length - 1];
  }

  getTelegramConfig() {
    const botToken = this.get('TELEGRAM_BOT_TOKEN');
    return {
      botToken,
      apiBotURL: `https://api.telegram.org/bot${botToken}`,
    };
  }
}
