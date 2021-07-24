import { API_TAGS } from '@/common/constants';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Project } from './schema/project.schema';
import { PROJECT_STATUS } from './constants/project.enum';
import {
  APIKeyDTO,
  CreateProjectDTO,
  DomainDTO,
  SetTelegramDTO,
} from './dto/project.class';
import { ProjectsService } from './projects.service';

import { ProjectGuard } from './guards/project.guard';
import { OwnerGuard } from './guards/owner.guard';
import { CreateInvitationDTO } from '../invitations/dto/invitation.class';
import { BTSError } from '../errors/schema/error.schema';
import { ErrorService } from '../errors/error.service';
import { ProjectAPIKeyGuard } from './guards/projectAPIKey.guard';
import { CreateErrorDTO } from '../errors/dto/error.class';
import { isTelegramChatId } from '../shared/utils/isTelegramChatId';
import { isDomain } from '../shared/utils/isDomain';
import { Invitation } from '../invitations/schema/invitation.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JWTPayload } from '../auth/dto/jwt.class';

@ApiTags(API_TAGS.PROJECT)
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService,
    private errorService: ErrorService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Success', type: Project })
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Body() createProjectDTO: CreateProjectDTO,
    @Request() req: { user: JWTPayload },
  ) {
    if (!isDomain(createProjectDTO.domain)) {
      throw new BadRequestException();
    }
    const createdProject = await this.projectService.create(
      createProjectDTO,
      req.user.id,
    );
    return createdProject;
  }

  @Get(':projectId')
  @ApiOkResponse({ description: 'Success', type: Project })
  @UseGuards(ProjectGuard)
  async getProject(@Param('projectId') id: string) {
    const project = await this.projectService.findOneById(id);
    const isDeleted = project.status === PROJECT_STATUS.DELETED;
    return isDeleted
      ? {
          status: project.status,
        }
      : project;
  }

  @Delete(':projectId')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(OwnerGuard)
  async deleteProject(@Param('projectId') id: string) {
    await this.projectService.delete(id);
    return 'Deleted';
  }

  @Get(':projectId/members')
  @ApiOkResponse({ description: 'Success', type: Project })
  @UseGuards(ProjectGuard)
  async getMembers(@Param('projectId') id: string) {
    const projectMembers = await this.projectService.getMembers(id);
    return projectMembers;
  }

  @Delete(':projectId/members/:memberId')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(OwnerGuard)
  async deleteMember(
    @Param('projectId') projectId: string,
    @Param('memberId') memberId: string,
  ) {
    await this.projectService.removeMember(projectId, memberId);
    return `Removed ${memberId}`;
  }

  @Get(':projectId/invitations')
  @ApiOkResponse({ description: 'Success', type: [Invitation] })
  @UseGuards(ProjectGuard)
  async getInvitations(@Param('projectId') id: string) {
    const projectInvitations = await this.projectService.getInvitations(id);
    return projectInvitations;
  }

  @Post(':projectId/invitations')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(OwnerGuard)
  async invite(
    @Param('projectId') id: string,
    @Body() body: CreateInvitationDTO,
  ) {
    const { email } = body;
    await this.projectService.invite(email, id);
    return 'Invited';
  }

  @Post('errors')
  @ApiCreatedResponse({ description: 'Success', type: BTSError })
  @UseGuards(ProjectAPIKeyGuard)
  async createError(@Body() createErrorDTO: CreateErrorDTO) {
    const project = await this.projectService.find({
      apiKey: createErrorDTO.apiKey,
      status: PROJECT_STATUS.NORMAL,
    });
    if (!createErrorDTO.source.toLocaleLowerCase().startsWith(project[0].domain.toLowerCase())) return;
    createErrorDTO.projectId = project[0]._id;
    const createdError = await this.errorService.create(createErrorDTO);
    this.projectService.notifyError(createdError);
    return createdError;
  }

  @Get(':projectId/errors')
  @ApiOkResponse({ description: 'Success', type: [BTSError] })
  @UseGuards(ProjectGuard)
  async getErrors(
    @Param('projectId') projectId: string,
    @Query('page') page: number,
    @Query('from') fromDate?: string,
    @Query('to') toDate?: string,
    @Query('sort') sort?: 'asc' | 'desc'
  ) {
    const count = await this.errorService.count(projectId);
    const errors = await this.errorService.getAll(
      projectId,
      page,
      20,
      fromDate,
      toDate,
      sort,
    );
    return { count, errors };
  }

  @Get(':projectId/errors/:id')
  @ApiOkResponse({ description: 'Success', type: [BTSError] })
  @UseGuards(ProjectGuard)
  async getError(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    const errors = await this.errorService.getOne(projectId, id);
    return errors;
  }

  @Patch(':projectId/api-key')
  @ApiOkResponse({ description: 'Success', type: APIKeyDTO })
  @UseGuards(OwnerGuard)
  async reGenerateAPIKey(@Param('projectId') id: string) {
    const apiKey = await this.projectService.reGenerateAPIKey(id);
    if (!apiKey) throw new BadRequestException();
    return {
      apiKey,
    };
  }

  @Patch(':projectId/domain')
  @ApiOkResponse({ description: 'Success', type: DomainDTO })
  @UseGuards(OwnerGuard)
  async setDomain(@Param('projectId') id: string, @Body() body: DomainDTO) {
    if (!isDomain(body.domain)) throw new BadRequestException();
    const domain = await this.projectService.setDomain(id, body.domain);
    if (!domain) throw new BadRequestException();
    return {
      domain,
    };
  }

  @Patch(':projectId/telegram')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(ProjectGuard)
  async setTelegram(
    @Param('projectId') id: string,
    @Body() body: SetTelegramDTO,
  ) {
    const { telegramChatId } = body;
    if (!isTelegramChatId(telegramChatId)) throw new BadRequestException();
    const project = await this.projectService.updateChatId(id, telegramChatId);
    if (!project) throw new BadRequestException();
    return 'Updated';
  }

  @Delete(':projectId/telegram')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(ProjectGuard)
  async unsetTelegram(@Param('projectId') id: string) {
    const project = await this.projectService.updateChatId(id, null);
    if (!project) throw new BadRequestException();
    return 'Updated';
  }

  @Get(':projectId/dashboard/today')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(ProjectGuard)
  async getTodayDashboard(@Param('projectId') projectId: string) {
    const start = new Date();
    start.setHours(0,0,0,0);

    let end = new Date();
    end.setHours(23,59,59,999);
  
    const errors = await this.errorService.getAll(
      projectId,
      1,
      1000,
      `${start.getTime()}`,
      `${end.getTime()}`,
      'asc');
    const res = [];
    for(let i = 0; i < 24; i++) {
      res.push([i, errors.reduce((cnt, error) => {
        if (new Date((error as any).createdAt).getHours() == i) {
          cnt += 1;
        }
        return cnt;
      }, 0)]);
    }
    return res;
  }

  @Get(':projectId/dashboard/last7days')
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(ProjectGuard)
  async get7DaysDashboard(@Param('projectId') projectId: string) {
    const start = new Date();
    start.setHours(23,59,59,999);

    let end = new Date();
    end.setDate(end.getDate() - 7);
    end.setHours(0,0,0,0);
    const errors = await this.errorService.getAll(
      projectId,
      1,
      1000,
      `${end.getTime()}`,
      `${start.getTime()}`,
      'asc');
    const res = [];
    for(let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      res.push([`${date.getDate()}/${date.getMonth() + 1}`, errors.reduce((cnt, error) => {
        if (new Date((error as any).createdAt).getDate() == date.getDate()) {
          cnt += 1;
        }
        return cnt;
      }, 0)]);
    }
    return res.reverse();
  }
}
