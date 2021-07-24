import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

import { SharedModule } from './shared/shared.module';
import { AppService } from './shared/services/app.service';
import { ProjectsModule } from './projects/projects.module';
import { InvitationsModule } from './invitations/invitations.module';
import { ErrorsModule } from './errors/error.module';
import { NotifyModule } from './notify/notify.module';
import { ScriptModule } from './script/script.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (appService:AppService) => ({
        uri: appService.getDbURL(),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [AppService],
    }),
    AuthModule,
    SharedModule,
    UsersModule,
    ProjectsModule,
    InvitationsModule,
    ErrorsModule,
    NotifyModule,
    ScriptModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
