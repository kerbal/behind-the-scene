import { Catch, ArgumentsHost, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.code === 11000) {
      return super.catch(
        new ConflictException({
          statusCode: 409,
          message: exception.message,
          error: 'Conflict',
        }),
        host,
      );
    }
    super.catch(exception, host);
  }
}
