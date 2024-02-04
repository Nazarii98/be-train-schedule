import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { TrainsModule } from './trains/trains.module';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TrainsModule,
    StationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
