import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Trail } from '../trails/trail.entity';
import { User } from '../users/user.entity';

@Entity('reviews')
export class Review {
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

  @Column('text', { nullable: true })
  description: string;

  @Column('float')
  notation: number;

  // Un avi est sur un trail
  @ManyToOne(() => Trail, (trail) => trail.reviews)
  trail: Trail;

  // Un avi est sur un trail
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
