
import { Logs } from 'src/logs/entities/logs.entitiy';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  // primary id of user
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // username of user
  @Column({ unique: true })
  username: string;

  // Relationship with Logs entity
  @OneToMany(() => Logs, (logs) => logs.user_id)
  logs: Logs;
}
