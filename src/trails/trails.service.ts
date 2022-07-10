import { Injectable } from '@nestjs/common';
import { IsNull, Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Trip } from '../trips/trip.entity';
import { CreateTrailsDto } from './dto';
import { Gear } from '../gears/gear.entity';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
  ) {}

  async getAllTrails() {
    return this.trailRepository.find({
      where: {
        location: Not(IsNull()),
      },
      select: {
        id: true,
        name: true,
        location: true,
        updatedAt: true,
        description: true,
        difficulty: {
          level: true,
        },
        images: {
          file: true,
          alt: true,
        },
      },
      relations: {
        images: true,
        difficulty: true,
      },
    });
  }

  async getAllGears() {
    return this.gearRepository.find({
      select: {
        id: true,
        name: true,
        links: true,
        gear_category: {
          name: true,
        },
      },
      relations: {
        gear_category: true,
      },
    });
  }

  async createTrail(createTrailDto: CreateTrailsDto) {
    const trail = new Trail();

    trail.trips = [];

    for (const e of createTrailDto.trips) {
      const trip = new Trip();
      trip.name = e.name;
      trip.description = e.description;
      trip.geojson = e.geojson;
      trail.trips.push(trip);
    }

    trail.name = createTrailDto.name;
    trail.geojson = createTrailDto.geojson;

    return await this.trailRepository.save(trail);
  }

  showTrailById(id: number): Promise<Trail> {
    return this.trailRepository.findOneBy({ id });
  }

  // async getKml(id: number): Promise<string> {
  //   const trail = await this.trailRepository.findOneBy({ id });
  //   return trail.geojson;
  // }
}
