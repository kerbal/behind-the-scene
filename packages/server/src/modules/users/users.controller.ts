import { API_TAGS } from '@/common/constants';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectUser, User } from './schema/user.schema';
import { UsersService } from './users.service';
import { PROJECT_STATUS } from '../projects/constants/project.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JWTPayload } from '../auth/dto/jwt.class';

@ApiTags(API_TAGS.USER)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: { user: JWTPayload }) {
    const currentUser = await this.userService.findOneById(req.user.id);
    const populatedUser = await currentUser
      .populate('projects.project', '_id name')
      .execPopulate();
    return { currentUser: populatedUser };
  }

  @Get('me/projects')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of projects',
    type: [ProjectUser],
  })
  @UseGuards(JwtAuthGuard)
  async getProjects(@Request() req: { user: JWTPayload }) {
    const projects = await this.userService.getProjects(req.user.id, {
      status: PROJECT_STATUS.NORMAL,
    });
    return projects;
  }
}
