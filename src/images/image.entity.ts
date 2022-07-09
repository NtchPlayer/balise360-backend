import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Trail } from '../trails/trail.entity';
import { Gear } from '../gears/gear.entity';

@Entity('images')
export class Image {
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

  @Column('varchar', { length: 100 })
  file: string;

  @Column('varchar', { length: 200 })
  alt: string;

  @ManyToOne(() => Trail, (trail) => trail.images)
  trail: Trail;

  @OneToOne(() => Gear)
  @JoinColumn()
  gear: Gear;
}
