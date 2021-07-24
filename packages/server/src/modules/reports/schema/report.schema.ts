import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { REPORT_STATUS } from '../constant/report.enum';

const { NORMAL } = REPORT_STATUS;
export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @ApiProperty()
  @Prop({
    required: true,
    type: Object,
  })
  data: Object;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
  })
  type: string;

  @ApiProperty({ type: String })
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    ref: 'Project',
  })
  projectId: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [NORMAL],
    default: NORMAL,
  })
  status: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
