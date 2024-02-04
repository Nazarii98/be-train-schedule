import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetStationResponse } from 'src/types/getStation.response';

@Injectable()
export class StationsService {
  constructor(private prismaServise: PrismaService) {}

  getStation(pagination: PaginationDto): Promise<GetStationResponse[]> {
    return this.prismaServise.station.findMany({ ...pagination });
  }
}
