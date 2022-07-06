import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@Controller('quiz')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('questions')
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get('questions/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    try {
      return await this.questionsService.findOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
