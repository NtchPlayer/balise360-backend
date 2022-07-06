import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Answer } from '../questions/answer.entity';

@Entity('quizdatas')
export class QuizData {
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

  // Des quizData sont associés à une réponse
  @ManyToOne(() => Answer, (answer) => answer.quizDatas)
  answer: Answer;

  // Des quizData sont associés à un utilisateur
  @ManyToOne(() => User, (user) => user.quizDatas)
  user: User;
}
