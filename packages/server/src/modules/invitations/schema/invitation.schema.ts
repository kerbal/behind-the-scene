import { ProjectDocument } from '@/modules/projects/schema/project.schema';
import { UserDocument } from '@/modules/users/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { INVITATION_STATUS } from '../constants/invitation.enum';

const { PENDING, ACCEPTED, REVOKED, DUPLICATED } = INVITATION_STATUS;

export type InvitationDocument = Invitation & Document;

@Schema({ timestamps: true })
export class Invitation {
  @ApiProperty()
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    ref: 'Project',
  })
  project: Types.ObjectId | ProjectDocument;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId | UserDocument;

  @ApiProperty()
  @Prop({
    required: true,
    match: /.+@.+\..+/,
  })
  email: string;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [PENDING],
    default: PENDING,
  })
  status: string;
}
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
