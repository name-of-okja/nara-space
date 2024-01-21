import { DeepPartial } from 'typeorm';

export abstract class AbstractEntity<T> {
  constructor(entity: DeepPartial<T>) {
    Object.assign(this, entity);
  }
}
