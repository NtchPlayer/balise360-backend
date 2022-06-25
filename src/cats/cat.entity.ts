import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats')
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}