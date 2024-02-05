import { addHours } from 'date-fns';
import { ScheduleCreateDto } from 'src/dto/scheduleCreate.dto';

const now = new Date();
const departureDate = addHours(now, 1);
const arrivalDate = addHours(departureDate, 2);

export const scheduleData: ScheduleCreateDto[] = [
  {
    departureDate,
    departureStationId: 1,
    arrivalDate,
    arrivalStationId: 3,
    trainId: 1,
  },
  {
    departureDate,
    departureStationId: 2,
    arrivalDate,
    arrivalStationId: 4,
    trainId: 2,
  },
  {
    departureDate,
    departureStationId: 1,
    arrivalDate,
    arrivalStationId: 3,
    trainId: 3,
  },
];
