import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'logs' })
export class Logs {
  // primary id of user
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // username of user
  @Column({ unique: true })
  username: string;

  // Relationship with Logs entity
  // @OneToMany(() => Logs, (logs) => logs.user_id)
  // logs: Logs;

  @ManyToMany(() => User, (user) => user.id)
  user_id: string;

  @Column()
  area_id: string;

  @Column()
  long: number;

  @Column()
  lat: number;
}
