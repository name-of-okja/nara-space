import { Entity, PrimaryGeneratedColumn, Column, MultiPolygon } from 'typeorm';
import { AbstractEntity } from '../libs/common';

@Entity('district')
export class District extends AbstractEntity<District> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  osm_id: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    nullable: false,
  })
  geometry: MultiPolygon;
}
