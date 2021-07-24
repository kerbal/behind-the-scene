import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';

import { Invitation, InvitationSchema } from './schema/invitation.schema';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
    ]),
    UsersModule,
    forwardRef(() => ProjectsModule),
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController],
  exports: [InvitationsService],
})
export class InvitationsModule {}
