import { AbstractEntity } from './abstract.entity';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AppDataSource } from '../../../data-source';
import { NotFoundException } from '../structure';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager = AppDataSource.manager
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }
  async findBy(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  async find(where: FindManyOptions<T>): Promise<T[]> {
    return this.entityRepository.find(where);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });

    if (!entity) {
      throw new NotFoundException('Entity was not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity
    );

    if (!updateResult.affected) {
      throw new NotFoundException('Entity was not found');
    }

    return this.findOne(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    return this.entityRepository.delete(where);
  }
}
