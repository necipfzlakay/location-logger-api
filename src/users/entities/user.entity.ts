import { Logs } from 'src/logs/entities/log.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  // primary id of user
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // username of user
  @Column({ unique: true })
  username: string;

  //users current vertical line position
  @Column({ type: 'float8', nullable: true })
  long: number;

  //users current horizontal line position
  @Column({ type: 'float8', nullable: true })
  lat: number;

  // Relationship with Logs entity
  @OneToOne(() => Logs, (logs) => logs.user_id)
  logs: Logs;
}
