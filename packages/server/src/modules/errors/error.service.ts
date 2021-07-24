import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorDocument, BTSError } from './schema/error.schema';
import { CreateErrorDTO } from './dto/error.class';

@Injectable()
export class ErrorService {
  constructor(
    @InjectModel(BTSError.name) private errorModel: Model<ErrorDocument>,
  ) {}

  async create (createErrorDto: CreateErrorDTO): Promise<ErrorDocument> {
    const error = await this.errorModel.create(createErrorDto);
    return error;
  }

  async count (projectId: string) {
    return this.errorModel.count({
      projectId
    });
  }

  async getAll (projectId: string, page: number, limit = 20, fromDate?: string, toDate?: string, sort?: 'asc' | 'desc'): Promise<ErrorDocument[]> {
    let fromDateObj: Date, toDateObj: Date;
    if (fromDate && toDate) {
      try {
        fromDateObj = new Date(parseInt(fromDate));
        toDateObj = new Date(parseInt(toDate));
      } catch (error) {}
    }

    const query: any = {
      projectId,
    };

    if (fromDateObj.getTime() && toDateObj.getTime()) {
      query.createdAt = {
        $gte: fromDateObj,
        $lte: toDateObj,
      };
    }

    return this.errorModel
      .find(query)
      .sort({
        createdAt: sort,
      })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async getOne (projectId: string, id: string): Promise<ErrorDocument> {
    return this.errorModel.findOne({
      _id: id,
      projectId,
    });
  }
}
