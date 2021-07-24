import { ApiProperty } from '@nestjs/swagger';

export class AuthGithubDTO {
  @ApiProperty()
  code: string
  @ApiProperty({example: null})
  state?: string
}
