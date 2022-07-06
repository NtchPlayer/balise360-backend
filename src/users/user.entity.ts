import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { QuizData } from '../quizDatas/quizData.entity';

@Entity('users')
export class User extends BaseEntity {
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

  @Column('varchar', { length: 30 })
  email: string;

  @Column('varchar', { length: 150 })
  password: string;

  @Column('varchar', { length: '50', nullable: true })
  username?: string;

  @Column('varchar', { length: 50 })
  firstname: string;

  @Column('varchar', { length: 50 })
  lastname: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column('enum', { enum: ['female', 'male', 'other'] })
  gender: string;

  @Column('int', { nullable: true })
  profile: number;

  @OneToMany(() => QuizData, (quizData) => quizData.user, {
    cascade: true,
  })
  quizDatas: QuizData[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }
}
