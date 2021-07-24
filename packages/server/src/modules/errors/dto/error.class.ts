import { ApiProperty } from '@nestjs/swagger';
import { Schema as SchemaMongoose } from 'mongoose';

export class CreateErrorDTO {
  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  projectId?: string;

  @ApiProperty({ example: 'Type Errors' })
  name: string;

  @ApiProperty({ example: "Cannot read property 'table_fields' of undefined" })
  message: string;

  @ApiProperty({ example: './index.js' })
  source: string;

  @ApiProperty({ example: ['Type Error: this is error', '\tat foo (<anonymous>:2:7)', '\tat <anonymous>:1:7'].join('\n') })
  stack: string;

  @ApiProperty({ example: 1 })
  lineNo: number;

  @ApiProperty({ example: 19 })
  colNo: number;

  @ApiProperty({ example: 'Chrome' })
  browserName: string;

  @ApiProperty({ example: '87.0.4280' })
  browserVersion: string;

  @ApiProperty({ example: 'Windows 10' })
  osName: string;

  @ApiProperty({ example: '87.0.4280' })
  osVersion: string;

  @ApiProperty({ example: 'Dell' })
  deviceName: string;

  @ApiProperty({ example: 'Inspiron 15' })
  deviceModel: string;
}
