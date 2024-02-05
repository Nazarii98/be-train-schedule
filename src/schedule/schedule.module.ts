import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ScheduleModule {}
