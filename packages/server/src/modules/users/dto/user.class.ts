import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'tthuykh99@gmail.com' })
  email: string;

  @ApiProperty({ example: '102308158265882982938' })
  googleId?: string;

  @ApiProperty({ example: null })
  githubId?: string;

  @ApiProperty({ example: 'huy' })
  displayName?: string;
}
