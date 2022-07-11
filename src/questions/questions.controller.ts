import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@Controller('quiz')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('questions')
  findAll(
    @Query('trail_question', ParseBoolPipe) trail_question: boolean,
  ): Promise<Question[]> {
    return this.questionsService.findAll(trail_question);
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
