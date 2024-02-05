import { Prisma } from '@prisma/client';
import { IsInt, IsObject } from 'class-validator';

export class GetScheduleDto {
  @IsObject()
  where: Prisma.ScheduleWhereInput;

  @IsObject()
  orderBy: Prisma.ScheduleOrderByWithRelationInput;

  @IsInt()
  page: number;
}
