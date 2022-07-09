import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Trail } from '../trails/trail.entity';

@Entity('trips')
export class Trip {
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

  @Column('varchar', { length: 512 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('longtext')
  geojson: string;

  // Un parcours appartient un seul gr
  @ManyToOne(() => Trail, (trail) => trail.trips)
  trail: Trail;
}
