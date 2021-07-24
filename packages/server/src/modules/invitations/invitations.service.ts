import { Connection, Types, Model, ClientSession } from 'mongoose';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Invitation, InvitationDocument } from './schema/invitation.schema';
import { CreateInvitationDTO } from './dto/invitation.class';
import { UsersService } from '../users/users.service';
import { INVITATION_STATUS } from './constants/invitation.enum';
import { ProjectsService } from '../projects/projects.service';
import { UserDocument } from '../users/schema/user.schema';
import { ProjectDocument } from '../projects/schema/project.schema';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
    private userService: UsersService,
    @Inject(forwardRef(() => ProjectsService))
    private projectService: ProjectsService,
  ) {}

  async create(
    createInvitationDTO: CreateInvitationDTO,
  ): Promise<InvitationDocument> {
    const { email, project, user } = createInvitationDTO;
    return this.invitationModel.create({
      project,
      email,
      user,
    });
  }

  async accept(
    invitation: InvitationDocument,
    session: ClientSession,
  ): Promise<InvitationDocument> {
    const { user, project } = invitation;
    await this.projectService.addMember(
      invitation.project.toString(),
      invitation.user.toString(),
      session,
    );
    await this.userService.addProject(
      invitation.user.toString(),
      invitation.project.toString(),
      session,
    );
    await this.invitationModel
      .deleteMany(
        {
          user,
          project,
        },
        { session },
      )
      .exec();
    return invitation;
  }

  async reject(
    invitation: InvitationDocument,
    session: ClientSession,
  ): Promise<InvitationDocument> {
    const { _id } = invitation;
    await this.invitationModel.deleteOne({ _id }, { session }).exec();
    return invitation;
  }

  async userAcceptOrRevoke(
    id: string,
    email: string,
    userId: string,
    status: string,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    const statusHandler = {
      [INVITATION_STATUS.ACCEPTED]: 'accept',
      [INVITATION_STATUS.REJECT]: 'reject',
    };
    try {
      const invitation = await this.invitationModel
        .findOne({
          _id: id,
          email,
          user: userId,
        })
        .session(session)
        .exec();
      if (!invitation) return null;
      if (statusHandler[status]) {
        await this[statusHandler[status]](invitation, session);
        await session.commitTransaction();
        return invitation;
      }
      throw new BadRequestException();
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  async findOne(
    filter: {
      _id: string | Types.ObjectId;
      status?: string;
      email?: string;
      user?: string;
      project?: string;
    },
    selectString?: string,
  ): Promise<Invitation> {
    return this.invitationModel
      .findOne(filter, selectString)
      .populate('project')
      .populate('user')
      .exec();
  }

  async find(
    filter: any,
    selectString?: string,
    isAllPopulate: boolean = false,
  ) {
    let query = this.invitationModel.find(filter, selectString);
    if (isAllPopulate || !filter.project) query = query.populate('project');
    if (isAllPopulate || !filter.user) query = query.populate('user');
    return query.exec();
  }

  async isInvitedUser(userId: string, id: string) {
    const invitation = await this.findOne({ _id: id });
    if (!invitation) return false;
    const user = invitation.user as UserDocument;
    if (!!user) {
      return userId === user._id.toString();
    }
    return true;
  }

  async getInvitation(id: string, email: string, userId: string) {
    const invitation = await this.findOne({
      _id: id,
      email,
    });
    if (!invitation) return null;
    let user = invitation.user as UserDocument;
    if (!user) {
      const isInProject = await this.projectService.isInProject(userId, (invitation.project as ProjectDocument)._id.toString())
      if (isInProject) {
        await this.invitationModel.findByIdAndDelete(id);
        return null;
      }
      return this.invitationModel
        .findOneAndUpdate(
          {
            _id: id,
            email,
          },
          {
            user: userId,
          },
          { new: true },
        )
        .populate('project')
        .populate('user')
        .exec();
    }
    if (user._id.toString() !== userId) return null;
    return invitation;
  }

  async isEmailInvited(email: string, projectId: string) {
    return this.invitationModel.exists({
      email,
      project: projectId,
    });
  }
}
