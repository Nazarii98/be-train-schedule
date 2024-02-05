import { Injectable } from '@nestjs/common';
import { Prisma, Train } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from 'src/providers/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class TrainsService {
  constructor(private prismaServise: PrismaService) {}

  findMany({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.TrainWhereInput;
    orderBy?: Prisma.TrainOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Train>> {
    return paginate(
      this.prismaServise.train,
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
