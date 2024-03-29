import { Injectable } from '@nestjs/common';
import { Prisma, Station } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from 'src/providers/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class StationsService {
  constructor(private prismaServise: PrismaService) {}

  findMany({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.StationWhereInput;
    orderBy?: Prisma.StationOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Station>> {
    return paginate(
      this.prismaServise.station,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }
}
