import { Logs } from 'src/logs/entities/log.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'areas' })
export class Areas {
  // primary id of areas
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // vertical line position of area
  @Column({ type: 'float8', nullable: true })
  long: number;

  // horizontal line position of area
  @Column({ type: 'float8', nullable: true })
  lat: number;

  @Column({ type: 'jsonb', nullable: true })
  polygon: Array<[]>;

  // name of area (optional)
  @Column({ nullable: true })
  name: string;

  // Relationship with Logs entity
  @OneToOne(() => Logs, (logs) => logs.area_id)
  logs: Logs;
}
