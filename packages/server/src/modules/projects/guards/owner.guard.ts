import { JWTPayload } from '@/modules/auth/dto/jwt.class';
import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from '../projects.service';

@Injectable()
export class OwnerGuard extends AuthGuard('jwt') {
  constructor(private projectsService: ProjectsService) {
    super()
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
      const isOwner = await this.projectsService.isOwner(
        request.user.id,
        params.projectId,
      );
      return isOwner;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
