import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { ProjectsService } from '../projects.service';

@Injectable()
export class ProjectAPIKeyGuard implements CanActivate {
  constructor(private projectsService: ProjectsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const body = request.body;
    try {
      return await this.projectsService.verifyAPIKey(body.apiKey);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
