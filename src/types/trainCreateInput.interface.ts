import { TrainColors } from '../enums/trainColors';

export interface TrainCreateDto {
  name: string;
  color: TrainColors;
}
