import { Controller, Get, Query } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { Prisma, Train } from '@prisma/client';
import { PaginatedResult } from 'src/providers/paginator';
import { Public } from 'src/decorators/public.decorator';

@Controller('trains')
export class TrainsController {
  constructor(private trainsService: TrainsService) {}

  @Public()
  @Get('all')
  async getStations(
    @Query()
    {
      where,
      orderBy,
      page,
    }: {
      where: Prisma.TrainWhereInput;
      orderBy: Prisma.TrainOrderByWithRelationInput;
      page: number;
    },
  ): Promise<PaginatedResult<Train>> {
    const result = await this.trainsService.findMany({
      where,
      orderBy,
      page,
    });

    return result;
  }
}
