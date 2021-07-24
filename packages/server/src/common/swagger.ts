import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from '@shared/services/app.service';

export function setupSwagger(app: NestExpressApplication, appService: AppService): void {
  const options = new DocumentBuilder()
    .setTitle('The BTS server')
    .setDescription('The BTS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerUrl: `/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
});
}
