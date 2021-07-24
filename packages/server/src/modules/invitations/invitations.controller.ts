import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isEmail } from '../shared/utils/validator';
import { InvitationsService } from './invitations.service';
import { Invitation } from './schema/invitation.schema';
import { StatusDTO } from './dto/invitation.class';
import { API_TAGS } from '@/common/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JWTPayload } from '../auth/dto/jwt.class';

@ApiTags(API_TAGS.INVITATION)
@Controller('invitations')
export class InvitationsController {
  constructor(private invitationService: InvitationsService) {}

  @Get(':invitationId')
  @ApiOkResponse({ description: 'Success', type: Invitation })
  @UseGuards(JwtAuthGuard)
  async get(
    @Query('email') email: string,
    @Param('invitationId') id: string,
    @Request() req: { user: JWTPayload },
  ) {
    if (!isEmail(email)) throw new BadRequestException();
    const { id: userId } = req.user;
    const invitation = await this.invitationService.getInvitation(
      id,
      email,
      userId,
    );
    if (!invitation) throw new NotFoundException();
    return invitation;
  }

  @Patch(':invitationId')
  @ApiOkResponse({ description: 'Success', type: Invitation })
  @UseGuards(JwtAuthGuard)
  async userAcceptOrRevoke(
    @Param('invitationId') id: string,
    @Body() body: StatusDTO,
    @Request() req: { user: JWTPayload },
  ) {
    const { id: userId } = req.user;
    const { status, email } = body;
    if (!isEmail(email)) throw new BadRequestException();
    const invitation = await this.invitationService.userAcceptOrRevoke(
      id,
      email,
      userId,
      status,
    );
    if (!invitation) throw new NotFoundException();
    return invitation;
  }
}
