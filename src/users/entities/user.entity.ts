import { Logs } from 'src/logs/entities/log.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
