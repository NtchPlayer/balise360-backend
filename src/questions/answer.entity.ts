import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { QuizData } from '../quizDatas/quizData.entity';
import { Image } from '../images/image.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column('varchar', { length: 200 })
  label: string;

  @Column('varchar', { length: 100 })
  value: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  // Une réponse peut correspondre à plusieurs QuizData
  @OneToMany(() => QuizData, (quizData) => quizData.user, {
    cascade: true,
  })
  quizDatas: QuizData[];

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;
}
