import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  take: number;

  @IsNotEmpty()
  skip: number;
}
