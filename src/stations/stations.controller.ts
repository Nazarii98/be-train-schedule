import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { Prisma, Station } from '@prisma/client';
import { PaginatedResult } from 'src/providers/paginator';
import { Public } from 'src/decorators/public.decorator';

@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  @Public()
  @Get('all')
  async getStations(
    @Query()
    {
      where,
      orderBy,
      page,
    }: {
      where: Prisma.StationWhereInput;
      orderBy: Prisma.StationOrderByWithRelationInput;
      page: number;
    },
  ): Promise<PaginatedResult<Station>> {
    const result = await this.stationsService.findMany({
      where,
      orderBy,
      page,
    });

    return result;
  }
}
