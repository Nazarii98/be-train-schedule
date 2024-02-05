import { IsNotEmpty } from 'class-validator';

export class ScheduleCreateDto {
  @IsNotEmpty()
  departureDate: Date;

  @IsNotEmpty()
  departureStationId: number;

  @IsNotEmpty()
  arrivalDate: Date;

  @IsNotEmpty()
  arrivalStationId: number;

  @IsNotEmpty()
  trainId: number;
}
