import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { AppService } from '@shared/services/app.service';

export function setupSession(
  app: NestExpressApplication,
  appService: AppService,
): void {
  const isProd = appService.getEnvironment() === 'production';
  const { SECRET_KEY, MAX_AGE } = appService.getSessionConfig();
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: SECRET_KEY,
      saveUninitialized: false,
      resave: false,
      cookie: isProd
        ? {
            maxAge: MAX_AGE,
            secure: true,
          }
        : undefined,
    }),
  );
}
