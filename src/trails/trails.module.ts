import { Module } from '@nestjs/common';

// Service
import { TrailsService } from './trails.service';

import { TrailsController } from './trails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Trip } from '../trips/trip.entity';
import { Gear } from '../gears/gear.entity';
import { Answer } from '../questions/answer.entity';
import { User } from '../users/user.entity';
import { QuizData } from '../quizDatas/quizData.entity';

// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trail, Trip, Gear, Answer, User, QuizData]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async () => ({
    //     secret: process.env.ACCESS_TOKEN_SECRET,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [TrailsService],
  controllers: [TrailsController],
  exports: [TrailsService],
})
export class TrailsModule {}
