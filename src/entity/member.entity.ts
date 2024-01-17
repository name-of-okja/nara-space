import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Check,
  JoinTable,
  Point,
} from 'typeorm';
import { Score } from './score.entity';
import { AbstractEntity } from '../libs/common';

@Entity('member')
@Check(`"birthday" ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'`)
export class Member extends AbstractEntity<Member> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  birthday: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', nullable: false })
  location: Point;

  @CreateDateColumn({ type: 'timestamp', nullable: false, name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false, name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Score, (score) => score.member, { cascade: true })
  @JoinTable()
  scores: Score[];
}
