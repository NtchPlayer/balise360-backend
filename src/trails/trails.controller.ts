import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { TrailsService } from './trails.service';
import { CreateTrailsDto } from './dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Get()
  async getAllTrails() {
    return this.trailsService.getAllTrails();
  }

  @Get('/gears')
  async getAllGears() {
    return this.trailsService.getAllGears();
  }

  @Post('add')
  create(@Body() createTrailsDto: CreateTrailsDto) {
    return this.trailsService.createTrail(createTrailsDto);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.trailsService.showTrailById(id);
  }

  // @Get('kml/:id')
  // async xmlResponse(@Response() res, @Param('id', ParseIntPipe) id: number) {
  //   res.set('Content-Type', 'text/plain');
  //   res.send(await this.trailsService.getKml(id));
  // }
}
