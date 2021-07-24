import { ApiProperty } from '@nestjs/swagger';
import { INVITATION_STATUS } from '../constants/invitation.enum';

export class CreateInvitationDTO {
  @ApiProperty({ example: 'huynonstop123nt@gmail.com' })
  email: string;

  project: string;
  user?: string;
}

export class StatusDTO {
  @ApiProperty({
    example: `${INVITATION_STATUS.ACCEPTED} || ${INVITATION_STATUS.REJECT}`,
    enum: [INVITATION_STATUS.REJECT, INVITATION_STATUS.ACCEPTED],
  })
  status: INVITATION_STATUS;

  @ApiProperty({ example: 'huynonstop123nt@gmail.com' })
  email: string;
}
