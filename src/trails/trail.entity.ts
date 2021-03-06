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
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Trip } from '../trips/trip.entity';
import { Difficulty } from '../difficulties/difficulty.entity';
import { Image } from '../images/image.entity';
import { Gear } from '../gears/gear.entity';
import { Review } from '../reviews/review.entity';
import { QuizData } from '../quizDatas/quizData.entity';
import { Question } from '../questions/question.entity';

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

  @Column('varchar', { length: 20 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true, length: 200 })
  location: string;

  @Column('longtext')
  geojson: string;

  @Column('int', { nullable: true })
  elevation: number;

  @Column('int', { nullable: true })
  altitude: number;

  @Column('float', { nullable: true })
  length: number;

  // Chaque trail doit avoir une difficulté
  @ManyToOne(() => Difficulty, (difficulty) => difficulty.trails, {
    cascade: true,
  })
  difficulty: Difficulty;

  // Chaque trail doit avoir un traffic
  @Column('enum', {
    enum: ['Faible', 'Moyenne', 'Forte'],
    nullable: true,
  })
  traffic: string;

  // Un trail peut correspondre à plusieurs Trips
  @OneToMany(() => Trip, (trip) => trip.trail, {
    cascade: true,
  })
  trips: Trip[];

  @OneToMany(() => Image, (image) => image.trail, {
    cascade: true,
  })
  images: Image[];

  @OneToMany(() => Review, (review) => review.trail, {
    cascade: true,
  })
  reviews: Review[];

  @OneToMany(() => QuizData, (quizData) => quizData.trail, {
    cascade: true,
  })
  quizDatas: QuizData[];

  // Un trail peut avoir plusieurs équipements
  @ManyToMany(() => Gear)
  @JoinTable()
  gears: Gear[];

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];
}
