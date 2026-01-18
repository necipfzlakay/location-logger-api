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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  user_id: string;

  @Column()
  area_id: string;

  @Column({ type: 'float' })
  long: number;

  @Column({ type: 'float' })
  lat: number;

  @Column()
  description: string;
}
