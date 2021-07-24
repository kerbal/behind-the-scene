import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: Error, user: any, info: any) {
    if (err || !user) {
      if (info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('TokenExpired');
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
