import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
  @ApiProperty({ example: 'NMN' })
  name: string;

  @ApiProperty({ example: 'www.web-bi-bug.com' })
  domain?: string;
}

export class SetTelegramDTO {
  @ApiProperty({ example: '-1001204854444' })
  telegramChatId: string;
}

export class APIKeyDTO {
  @ApiProperty({example: '161240058663200000' })
  apiKey: string;
}

export class DomainDTO {
  @ApiProperty({ example: 'www.web-bi-bug.com' })
  domain: string;
}