import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
