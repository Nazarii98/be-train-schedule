import { Body, Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { PaginationDto } from 'src/dto/pagination.dto';
import { StationsService } from './stations.service';
import { GetStationResponse } from 'src/types/getStation.response';

@Public()
@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  @Get('all')
  getStations(
    @Body() pagination: PaginationDto,
  ): Promise<GetStationResponse[]> {
    return this.stationsService.getStation(pagination);
  }
}
