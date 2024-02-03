import { IsString, IsEnum } from 'class-validator';
import { TrainColors } from 'src/enums/trainColors';

export class TrainCreateDto {
  @IsString()
  name: string;

  @IsEnum(TrainColors, { message: 'Invalid color value' })
  color: TrainColors;
}
