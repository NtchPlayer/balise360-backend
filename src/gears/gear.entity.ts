import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { GearCategory } from './gearCategories.entity';

@Entity('gears')
export class Gear {
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
  name: string;

  @Column('varchar', { nullable: true, length: 500 })
  links: string;

  // Un gear appartient à une catégorie
  @ManyToOne(() => GearCategory, (gearCategory) => gearCategory.gears)
  gear_category: GearCategory;
}
