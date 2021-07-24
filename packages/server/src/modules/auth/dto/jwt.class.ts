import { ApiProperty } from '@nestjs/swagger';

export class JWTResponse {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  expiresIn: number;
  @ApiProperty()
  expiresAt: number;
}

export class JWTPayload {
  @ApiProperty()
  id: string
  @ApiProperty()
  email: string
}