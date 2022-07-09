import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trail } from '../trails/trail.entity';

@Entity('difficulties')
export class Difficulty {
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

  @Column('varchar', { length: 50 })
  level: string;

  @Column('int', { nullable: true })
  durationMin: number;

  @Column('int', { nullable: true })
  durationMax: number;

  @Column('int', { nullable: true })
  elevationMin: number;

  @Column('int', { nullable: true })
  elevationMax: number;

  @Column('int', { nullable: true })
  altitudeMin: number;

  @Column('int', { nullable: true })
  altitudeMax: number;

  @Column('varchar', { length: 255 })
  physique: string;

  @OneToMany(() => Trail, (trail) => trail.difficulty)
  trails: Trail[];
}
