import { ProjectDocument } from '@/modules/projects/schema/project.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { ERROR_STATUS } from '../constants/error.enum';

const { NORMAL } = ERROR_STATUS;

export type ErrorDocument = BTSError & Document;

@Schema({ timestamps: true })
export class BTSError {
  @ApiProperty()
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  message: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  source: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  stack: string;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  })
  lineNo: Number;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  })
  colNo: Number;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  browserName: string;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  browserVersion: String;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  osName: String;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  osVersion: String;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  deviceName: String;

  @ApiProperty()
  @Prop({
    type: String,
    validate: {
      validator: String,
      message: '{VALUE} is not a string',
    },
  })
  deviceModel: String;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    ref: 'Project',
  })
  projectId: string;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [NORMAL],
    default: NORMAL,
  })
  status: string;
}
export const ErrorSchema = SchemaFactory.createForClass(BTSError);
