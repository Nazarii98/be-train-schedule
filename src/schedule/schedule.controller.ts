import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { ScheduleService } from './schedule.service';
import { PaginatedResult } from 'src/providers/paginator';
import { Public } from 'src/decorators/public.decorator';
import { GetScheduleDto } from 'src/dto/getSchedule.dto';

@Public()
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('all')
  async getSchedule(
    @Query() dto: GetScheduleDto,
  ): Promise<PaginatedResult<Schedule>> {
    try {
      const result = await this.scheduleService.findMany(dto);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while processing the request.',
      );
    }
  }

  @Delete('delete')
  async deleteSchedule(@Query('id') id: string): Promise<void> {
    try {
      await this.scheduleService.delete(+id);
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }
}
