import { ClientSession, Model, mongo, Mongoose, Schema, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectUser, User, UserDocument } from './schema/user.schema';
import { CreateUserDTO } from './dto/user.class';
import { FindUserFilter } from './interfaces/user.interface';
import { ROLE } from './constants/user.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  async find (query): Promise<UserDocument[]>{
    return this.userModel.find(query);
  }

  async findOne(
    filter: FindUserFilter,
    selectString?: string,
  ): Promise<UserDocument> {
    return this.userModel.findOne(filter, selectString).exec();
  }

  async findEmailById(id: string) {
    const user = await this.findOneById(id);
    return user.email;
  }

  async findOneById(id: string, selectString?: string): Promise<UserDocument> {
    return this.userModel.findById(id, selectString).exec();
  }

  async getProjects(id: string, filter?: any): Promise<ProjectUser[]> {
    const userWithProjects = await this.userModel
      .findById(id, 'projects')
      .populate({
        path: 'projects.project',
        match: filter,
      })
      .exec();
    return userWithProjects?.projects;
  }

  async verifyUser(loginUserDTO: CreateUserDTO): Promise<UserDocument> {
    const { email, googleId, githubId } = loginUserDTO;
    const user = await this.findOne({
      email,
    });
    if (!user) {
      return this.create(loginUserDTO);
    }
    if (googleId) {
      return this.verifyGoogleUser(user, googleId.toString());
    }
    if (githubId) {
      return this.verifyGithubUser(user, githubId.toString());
    }
    return null;
  }

  async verifyGoogleUser(
    user: UserDocument,
    googleId: string,
  ): Promise<UserDocument> {
    if (!user.googleId) {
      user.googleId = googleId;
      return user.save();
    }
    return googleId === user.googleId ? user : null;
  }

  async verifyGithubUser(
    user: UserDocument,
    githubId: string,
  ): Promise<UserDocument> {
    if (!user.githubId) {
      user.githubId = githubId;
      return user.save();
    }
    return githubId === user.githubId ? user : null;
  }

  async addProject(id: string, projectId: string, session?: ClientSession) {
    return this.userModel
      .findOneAndUpdate(
        { _id: id, 'projects.project': { $ne: projectId } },
        {
          $push: {
            projects: {
              project: Types.ObjectId(projectId),
              role: ROLE.OWNER,
            },
          },
        },
        { session, new: true },
      )
      .exec();
  }

  async deleteAllProjects(projectId: string, session?: ClientSession) {
    return this.userModel
      .updateMany(
        {
          'projects.project': projectId,
        },
        {
          $pull: {
            projects: {
              project: Types.ObjectId(projectId),
            },
          },
        },
        { session },
      )
      .exec();
  }

  async deleteProject(id: string, projectId: string, session?: ClientSession) {
    return this.userModel
      .updateOne(
        {
          _id: id,
        },
        {
          $pull: {
            projects: {
              project: Types.ObjectId(projectId),
            },
          },
        },
        { session, new: true },
      )
      .exec();
  }

  async syncIndexers() {
    return this.userModel.syncIndexes().then(() => {
      console.log('Synced');
    });
  }
}
