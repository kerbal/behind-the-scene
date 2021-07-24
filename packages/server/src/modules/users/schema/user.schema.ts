import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { ROLE } from '../constants/user.enum';

export type UserDocument = User & Document;
const { OWNER, COLLABORATOR } = ROLE;
@Schema()
export class ProjectUser {
  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.ObjectId,
    required: true,
    ref: 'Project',
  })
  project: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [OWNER, COLLABORATOR],
    required: true,
  })
  role: string;
}
const ProjectUserSchema = SchemaFactory.createForClass(ProjectUser);

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
    match: /.+@.+\..+/,
  })
  email: string;

  @ApiProperty()
  @Prop({
    unique: true,
    sparse: true,
  })
  googleId: string;

  @ApiProperty()
  @Prop({
    unique: true,
    sparse: true,
  })
  githubId: string;

  @ApiProperty()
  @Prop()
  displayName: string;

  @ApiProperty({ type: [ProjectUser] })
  @Prop({
    type: [ProjectUserSchema],
  })
  projects: ProjectUser[];
}

export const UserSchema = SchemaFactory.createForClass(User);
