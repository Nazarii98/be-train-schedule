import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import { GetScheduleDto } from 'src/dto/getSchedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from 'src/providers/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ScheduleService {
  constructor(private prismaService: PrismaService) {}

  findMany(dto: GetScheduleDto): Promise<PaginatedResult<Schedule>> {
    const { where, orderBy, page } = dto;
    return paginate(
      this.prismaService.schedule,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  create(scheduleData: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule> {
    const data = {
      departureDate: scheduleData.departureDate,
      departureStationId: scheduleData.departureStationId,
      arrivalDate: scheduleData.arrivalDate,
      arrivalStationId: scheduleData.arrivalStationId,
      trainId: scheduleData.trainId,
    };

    return this.prismaService.schedule.create({
      data,
    });
  }

  update(
    id: number,
    scheduleData: Prisma.ScheduleUpdateInput,
  ): Promise<Schedule> {
    return this.prismaService.schedule.update({
      where: { id },
      data: scheduleData,
    });
  }

  delete(id: number): Promise<Schedule> {
    return this.prismaService.schedule.delete({ where: { id } });
  }

  async findById(id: number): Promise<Schedule | null> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }
}
