import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppService } from '../shared/services/app.service';
import { JWTPayload } from './dto/jwt.class';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private appService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appService.getJWTConfig().secret,
    });
  }

  async validate(payload: any): Promise<JWTPayload> {
    return payload;
  }
}
