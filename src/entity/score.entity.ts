import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Check,
} from 'typeorm';
import { Member } from './member.entity';
import { AbstractEntity } from '../libs/common';

export type Subject = 'math' | 'science' | 'english';

@Entity('score')
@Check(`"score" >= 0 AND "score" <= 100`)
export class Score extends AbstractEntity<Score> {
  @PrimaryColumn()
  memberId: number;

  @PrimaryColumn({
    type: 'enum',
    enum: ['math', 'science', 'english'],
  })
  subject: Subject;

  @Column({
    type: 'int',
    default: 0,
  })
  score: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false, name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false, name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.scores)
  @JoinColumn({ name: 'memberId' })
  member: Member;
}
