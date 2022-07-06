import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizData } from './quizData.entity';

@Injectable()
export class QuizDatasService {
  constructor(
    @InjectRepository(QuizData)
    private readonly quizDataRepository: Repository<QuizData>,
  ) {}
  async findAll(): Promise<QuizData[]> {
    return this.quizDataRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number): Promise<QuizData> {
    return this.quizDataRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.quizDatas', 'quizDatas')
      .where({ id })
      .getOne();
  }
}
