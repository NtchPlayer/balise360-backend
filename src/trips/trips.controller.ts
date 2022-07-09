import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { TripsService } from './trips.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trips')
export class TrailsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.tripsService.showById(id);
  }
}
