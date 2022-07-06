import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Trip } from './trip.entity';
import { CreateTrailsDto } from './dto';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
  ) {}

  async createTrail(createTrailDto: CreateTrailsDto) {
    const trail = new Trail();

    trail.trips = [];

    for (const e of createTrailDto.trips) {
      const trip = new Trip();
      trip.name = e.name;
      trip.description = e.description;
      trail.trips.push(trip);
    }

    trail.name = createTrailDto.name;
    trail.geojson = createTrailDto.geojson;

    return await this.trailRepository.save(trail);
  }
}
