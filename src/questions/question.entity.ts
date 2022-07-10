import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Trail } from '../trails/trail.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { length: 150 })
  title: string;

  @Column('varchar', { length: 150, nullable: true })
  description: string;

  @Column('boolean', { default: false })
  trail_question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => Trail)
  @JoinTable()
  trails: Trail[];
}
