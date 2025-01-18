import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true, length: 11 })
  cpf: string;

  @ApiProperty()
  @Column({ unique: true, length: 150 })
  email: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observations?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
