import { isEmail } from '@/modules/shared/utils/validator';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
@Injectable()
export class LoginUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isEmail(value.email)) throw new BadRequestException();
    const { email, googleId, githubId, displayName } = value;
    if (!googleId && !githubId) throw new BadRequestException();

    if (githubId) {
      value = {
        email,
        githubId,
      };
    }

    if (googleId) {
      value = {
        email,
        googleId,
      };
    }
    value.displayName = displayName || email;
    return value;
  }
}
