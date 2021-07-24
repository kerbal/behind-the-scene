import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';

import { Project, ProjectSchema } from './schema/project.schema';
import { InvitationsModule } from '../invitations/invitations.module';
import { ErrorsModule } from '../errors/error.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    UsersModule,
    ErrorsModule,
    forwardRef(() => InvitationsModule),
    NotifyModule,
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
