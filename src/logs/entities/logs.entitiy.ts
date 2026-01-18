import {
  Column,
  Entity,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  user_id: string;

  @Column()
  area_id: string;

  @Column()
  long: number;

  @Column()
  lat: number;

  @Column()
  description: string;
}
