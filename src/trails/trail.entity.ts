/**
 * On stocke la donnée brute dans la colonne 'geojson' afin d'éviter toute mauvaise interprétation du format GeoJson (RFC 7946) définie ici: https://geojson.org/
 * Un traitement spécifique est effectué sur les propriétés de chaque trip (Feature).
 * */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trip } from './trip.entity';

@Entity('trails')
export class Trail {
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

  @Column('text')
  geojson: string;

  // @ManyToOne(() => Question, (question) => question.answers)
  // question: Question;

  // Un trail peut correspondre à plusieurs Trips
  @OneToMany(() => Trip, (trip) => trip.trail, {
    cascade: true,
  })
  trips: Trip[];
}
