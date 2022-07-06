import { Module } from '@nestjs/common';

// Service
import { TrailsService } from './trails.service';

import { TrailsController } from './trails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Trip } from './trip.entity';

// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Answer } from '../questions/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trail, Trip]),
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
