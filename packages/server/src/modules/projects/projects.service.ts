import { ClientSession, Connection, FilterQuery, Model, Types } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Project, ProjectDocument } from './schema/project.schema';
import { CreateProjectDTO } from './dto/project.class';
import { PROJECT_STATUS } from './constants/project.enum';

import { UsersService } from '../users/users.service';
import { generator } from '../shared/utils/apiKey';
import { isEmail } from '../shared/utils/validator';
import { InvitationsService } from '../invitations/invitations.service';
import { MailService } from '../shared/services/mail.service';
import { TelegramService } from '../notify/services/telegram.service';
import { User, UserDocument } from '../users/schema/user.schema';
import { ErrorDocument } from '../errors/schema/error.schema';
import { NotifyService } from '../notify/services/notify.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private usersService: UsersService,
    @Inject(forwardRef(() => InvitationsService))
    private invitationService: InvitationsService,
    private mailService: MailService,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private telegramService: TelegramService,
    private notifyService: NotifyService,
  ) {}

  async create(
    createProjectDTO: CreateProjectDTO,
    userId: string,
  ): Promise<ProjectDocument> {
    const apiKey = await this.genApiKey();
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const createdProject: ProjectDocument = (
        await this.projectModel.create(
          [
            {
              ...createProjectDTO,
              apiKey,
              owner: userId,
            },
          ],
          { session },
        )
      )[0];
      await this.usersService.addProject(userId, createdProject._id, session);
      await session.commitTransaction();
      return createdProject;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  private async genApiKey() {
    const counter = await this.projectModel.countDocuments();
    return generator(counter);
  }

  async reGenerateAPIKey(id: string) {
    try {
      const apiKey = await this.genApiKey();
      const project = await this.projectModel.findByIdAndUpdate(id, { apiKey });
      return project ? apiKey : null;
    } catch (err) {
      return null;
    }
  }

  async setDomain(id: string, domain: string) {
    try {
      const project = await this.projectModel.findByIdAndUpdate(id, {
        domain,
      });
      return project ? domain : null;
    } catch (err) {
      return null;
    }
  }

  async findOneById(
    id: string,
    selectString?: string,
  ): Promise<ProjectDocument> {
    return this.projectModel.findById(id, selectString).exec();
  }

  async find(
    filter: FilterQuery<ProjectDocument>,
    selectString?: string,
  ): Promise<ProjectDocument[]> {
    return this.projectModel.find(filter, selectString).exec();
  }

  async isOwner(userId: string, projectId: string) {
    return this.projectModel.exists({
      _id: projectId,
      owner: userId,
    });
  }

  async isInProject(userId: string, projectId: string) {
    return this.projectModel.exists({
      $or: [
        {
          _id: projectId,
          owner: userId,
        },
        {
          _id: projectId,
          members: Types.ObjectId(userId),
        },
      ],
    });
  }

  async delete(id: string) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const rs = await Promise.all([
        this.projectModel
          .updateOne(
            {
              _id: id,
            },
            {
              status: PROJECT_STATUS.DELETED,
            },
            { session },
          )
          .exec(),
        this.usersService.deleteAllProjects(id, session),
      ]);
      await session.commitTransaction();
      return rs;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  async addMember(id: string, memberId: string, session?: ClientSession) {
    return this.projectModel
      .findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            members: Types.ObjectId(memberId),
          },
        },
        { session, new: true },
      )
      .exec();
  }

  async removeMember(id: string, memberId: string) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const rs = await Promise.all([
        this.projectModel
          .updateOne(
            { _id: id },
            {
              $pull: {
                members: Types.ObjectId(memberId),
              },
            },
            { session, new: true },
          )
          .exec(),
        this.usersService.deleteProject(memberId, id, session),
      ]);
      await session.commitTransaction();
      return rs;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  async canInvite(email: string, projectId: string) {
    if (!isEmail(email)) return false;
    const userInProject = await this.usersService.findOne({
      email,
      'projects.project': Types.ObjectId(projectId),
    });
    if (userInProject) return false;
    const isEmailInvited = await this.invitationService.isEmailInvited(
      email,
      projectId,
    );
    if (isEmailInvited) return false;
    return true;
  }

  async invite(email: string, projectId: string) {
    if (!isEmail(email)) return null;
    const project = await this.findOneById(projectId);
    if (!project) return null;
    const canInvite = await this.canInvite(email, projectId);
    if (!canInvite) return null;
    const user = await this.usersService.findOne({ email });
    const invitation = await this.invitationService.create(
      user
        ? {
            email,
            project: projectId,
            user: user._id,
          }
        : {
            email,
            project: projectId,
          },
    );
    try {
      await this.mailService.sendInvitation(invitation);
    } catch (err) {
      console.log(err);
    }
    return invitation;
  }

  async verifyAPIKey(apiKey: string) {
    const projects = await this.find({
      apiKey,
      status: PROJECT_STATUS.NORMAL,
    });
    return projects.length === 1;
  }

  async updateChatId(id: string, chatId: string) {
    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        chatId
          ? {
              telegramChatId: chatId,
            }
          : {
              $unset: {
                telegramChatId: 1,
              },
            },
      )
      .exec();

    if (!project) return null;

    const oldId = project.telegramChatId;
    try {
      if (oldId && oldId !== chatId) {
        await this.telegramService.sendGoodbye(oldId, project);
      }
      if (chatId && oldId !== chatId) {
        await this.telegramService.sendWelcome(chatId, project);
      }
    } catch (err) {
      console.log(err);
    }
    return project;
  }

  async notifyError(error: ErrorDocument) {
    const project = await this.projectModel.findById(error.projectId);
    const { members, owner } = await this.getMembers(project._id);
    await this.notifyService.notifyError(error, project, [...members, owner] as any[]);
  }

  async getMembers(id: string) {
    const selectedProject = await this.findOneById(id, '_id owner members');
    const populatedProject = await selectedProject
      .populate('owner')
      .populate('members')
      .execPopulate();
    return populatedProject;
  }

  async getInvitations(id: string) {
    const projectInvitations = await this.invitationService.find({
      project: id,
    });
    return projectInvitations;
  }

  async syncIndexers() {
    return this.projectModel.syncIndexes().then(() => {
      console.log('Synced');
    });
  }
}
