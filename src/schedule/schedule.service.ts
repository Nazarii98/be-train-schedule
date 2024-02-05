import { Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
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
  constructor(private prismaServise: PrismaService) {}

  findMany(dto: GetScheduleDto): Promise<PaginatedResult<Schedule>> {
    const { where, orderBy, page } = dto;
    return paginate(
      this.prismaServise.schedule,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  delete(id: number): Promise<Schedule> {
    return this.prismaServise.schedule.delete({ where: { id } });
  }
}
