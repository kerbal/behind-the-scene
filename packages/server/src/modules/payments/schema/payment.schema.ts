import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  PAYMENT_STATUS,
  PAYMENT_CURRENCY,
  PAYMENT_PROVIDER,
  PAYMENT_TYPE,
} from '../constants/payment.enum';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @ApiProperty()
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    ref: 'Project',
  })
  projectId: Types.ObjectId;

  @ApiProperty()
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({
    required: true,
    type: Number,
  })
  amount: Number;

  @ApiProperty()
  @Prop({
    required: true,
    enum: [PAYMENT_CURRENCY.USD],
    type: SchemaMongoose.Types.String,
  })
  currency: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: SchemaMongoose.Types.String,
  })
  providerInvoiceId: string;

  @ApiProperty()
  @Prop({
    required: true,
    enum: [PAYMENT_PROVIDER.PAYPAL],
    type: SchemaMongoose.Types.String,
  })
  provider: string;

  @ApiProperty()
  @Prop({
    required: true,
    enum: [PAYMENT_TYPE.NORMAL],
    type: SchemaMongoose.Types.String,
  })
  type: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  })
  errorAmount: Number;

  @ApiProperty()
  @Prop({
    type: SchemaMongoose.Types.String,
    enum: [PAYMENT_STATUS.NORMAL],
    default: PAYMENT_STATUS.NORMAL,
  })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
