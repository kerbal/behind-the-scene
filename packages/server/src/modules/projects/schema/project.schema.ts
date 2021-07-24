import { isDomain } from '@/modules/shared/utils/isDomain';
import { isTelegramChatId } from '@/modules/shared/utils/isTelegramChatId';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { PROJECT_STATUS } from '../constants/project.enum';

const { DELETED, NORMAL } = PROJECT_STATUS;
export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @ApiProperty()
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    unique: true,
    required: true,
  })
  apiKey: string;

  @ApiProperty()
  @Prop({
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  })
  numberOfErrors: number;

  @ApiProperty()
  @Prop({
    default: 1000,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  })
  errorLimit: number;

  @ApiProperty({ type: String })
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    ref: 'User',
  })
  owner: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'User' }],
  })
  members: Types.ObjectId[];

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [DELETED, NORMAL],
    default: NORMAL,
  })
  status: string;

  @ApiProperty()
  @Prop({
    validate: {
      validator: isDomain,
      message: '{VALUE} must be a domain or empty',
    }
  })
  domain: string;

  @ApiProperty()
  @Prop({
    validate: {
      validator: isTelegramChatId,
      message: '{VALUE} is not a telegram chat ID',
    },
  })
  telegramChatId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
