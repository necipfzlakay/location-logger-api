
import { Logs } from 'src/logs/entities/logs.entitiy';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'areas' })
export class Areas {
  // primary id of areas
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  polygon: number[][];

  // name of area (optional)
  @Column({ nullable: true })
  name: string;

  // Relationship with Logs entity
  @OneToMany(() => Logs, (logs) => logs.area_id)
  logs: Logs;
}
