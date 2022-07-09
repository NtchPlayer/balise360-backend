import { Module } from '@nestjs/common';

// Service
import { TripsService } from './trips.service';

import { TrailsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';

// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async () => ({
    //     secret: process.env.ACCESS_TOKEN_SECRET,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [TripsService],
  controllers: [TrailsController],
  exports: [TripsService],
})
export class TripsModule {}
