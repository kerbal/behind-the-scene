import { ApiProperty } from '@nestjs/swagger';

export class AppInfo {
  @ApiProperty({ example: 'Hello word' })
  message: string;
  @ApiProperty({ example: 'development' })
  env: string;
  @ApiProperty({ example: false })
  docker: boolean;
}
