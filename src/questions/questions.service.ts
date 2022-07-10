import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findAll(trail_question: boolean): Promise<Question[]> {
    return this.questionRepository.find({
      where: {
        trail_question: trail_question,
      },
      relations: ['answers', 'answers.image'],
    });
  }

  findOne(id: number): Promise<Question> {
    return this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answers')
      .where({ id })
      .getOne();
  }
}
