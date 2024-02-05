import { TrainCreateDto } from 'src/dto/trainCreateInput.dto';
import { TrainColors } from '../../src/enums/trainColors';

export const trainsData: TrainCreateDto[] = [
  {
    name: 'Azov',
    color: TrainColors.Blue,
  },
  {
    name: 'Volun',
    color: TrainColors.Green,
  },
  {
    name: 'Dnipro',
    color: TrainColors.Yellow,
  },
  {
    name: 'Donbas',
    color: TrainColors.Red,
  },
];
