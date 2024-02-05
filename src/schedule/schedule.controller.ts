import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
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

  @Post('create')
  async createSchedule(
    @Body() createDto: Prisma.ScheduleCreateInput,
  ): Promise<Schedule> {
    try {
      const createdSchedule = await this.scheduleService.create(createDto);
      return createdSchedule;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the schedule.',
      );
    }
  }

  @Put('update/:id')
  async updateSchedule(
    @Query('id') id: string,
    @Body() updateDto: Prisma.ScheduleUpdateInput,
  ): Promise<Schedule> {
    try {
      const updatedSchedule = await this.scheduleService.update(+id, updateDto);
      return updatedSchedule;
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
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
