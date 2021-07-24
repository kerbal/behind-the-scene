import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@/modules/app.module';

import { AppService } from '@shared/services/app.service';
import { setupSwagger } from '@/common/swagger';
import { AllExceptionsFilter } from '@/common/base.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appService = app.get(AppService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  const port = appService.get('PORT') || 3000;
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api');

  setupSwagger(app, appService);
  
  await app.listen(port, () => {
    console.log('APP is listening on port ' + port);
  });
}
bootstrap();
