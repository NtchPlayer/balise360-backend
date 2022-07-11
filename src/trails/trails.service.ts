import { Injectable } from '@nestjs/common';
import { IsNull, Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Trip } from '../trips/trip.entity';
import { CreateTrailsDto } from './dto';
import { Gear } from '../gears/gear.entity';
import { AddSurveyDto } from './dto';
import { QuizData } from '../quizDatas/quizData.entity';
import { Answer } from '../questions/answer.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(QuizData)
    private readonly quizDataRepository: Repository<QuizData>,
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
    return this.trailRepository
      .createQueryBuilder('trails')
      .leftJoinAndSelect('trails.images', 'images')
      .leftJoinAndSelect('trails.difficulty', 'difficulty')
      .leftJoinAndSelect('trails.gears', 'gears')
      .where({ id })
      .getOne();
  }

  async addSurvey(userId: number, addSurveyDto: AddSurveyDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const trail = await this.trailRepository.findOneBy({
      id: addSurveyDto.trailId,
    });
    for (const e of addSurveyDto.answers) {
      const answer = await this.answerRepository.findOneBy({ id: e });
      const quizData = new QuizData();
      quizData.answer = answer;
      quizData.trail = trail;
      quizData.user = user;
      await this.quizDataRepository.save(quizData);
    }
    return 'success!';
  }

  // async getKml(id: number): Promise<string> {
  //   const trail = await this.trailRepository.findOneBy({ id });
  //   return trail.geojson;
  // }
}
