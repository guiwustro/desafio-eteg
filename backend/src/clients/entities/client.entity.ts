import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  color: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
