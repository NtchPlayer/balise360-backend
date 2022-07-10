import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity('users_admin')
export class AdminUser {
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }
}
