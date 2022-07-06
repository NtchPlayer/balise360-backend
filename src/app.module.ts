import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Service
import { AppService } from './app.service';

// Controller
import { AppController } from './app.controller';

// Entity
import { Cat } from './cats/cat.entity';
import { User } from './users/user.entity';
import { Question } from './questions/question.entity';
import { Answer } from './questions/answer.entity';
import { RefreshToken } from './token/refresh-token.entity';
import { QuizData } from './quizDatas/quizData.entity';
import { Trail } from './trails/trail.entity';
import { Trip } from './trails/trip.entity';

// Module
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.modules';
import { TrailsModule } from './trails/trails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        IS_DEV: Joi.boolean().required(),
        API_KEY_SENDINGBLUE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Cat,
        User,
        RefreshToken,
        Question,
        Answer,
        QuizData,
        Trail,
        Trip,
      ],
      synchronize: Boolean(process.env.IS_DEV) || false,
    }),
    AuthModule,
    CatsModule,
    UsersModule,
    NewsletterModule,
    QuestionsModule,
    TrailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
