import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class AddQuizResultDto {
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsArray()
  quizDatas: Array<number>;
}
