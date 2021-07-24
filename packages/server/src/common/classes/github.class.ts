import { ApiProperty } from '@nestjs/swagger';

export class GithubTokenResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  scope: string;

  @ApiProperty({ example: 'bearer' })
  token_type: string;

  @ApiProperty({ example: 'bad_verification_code' })
  error?: string;
}

export class GithubUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}