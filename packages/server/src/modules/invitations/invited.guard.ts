import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTPayload } from '../auth/dto/jwt.class';
import { InvitationsService } from './invitations.service';

@Injectable()
export class InvitedGuard extends AuthGuard('jwt') {
  constructor(private invitationService: InvitationsService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (!(await super.canActivate(context))) {
        throw new UnauthorizedException();
      }
      const request: {
        user: JWTPayload;
        params: any;
      } = context.switchToHttp().getRequest();
      const params = request.params;
      if (request.user.id) {
        const isInvitedUser = await this.invitationService.isInvitedUser(
          request.user.id,
          params.invitationId,
        );
        return isInvitedUser;
      }
    } catch (e) {
      throw new UnauthorizedException();;
    }
  }
}
