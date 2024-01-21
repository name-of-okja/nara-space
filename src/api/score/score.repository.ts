import { AppDataSource } from '../../data-source';
import { District, Member, Score } from '../../entity';
import { AbstractRepository } from '../../libs/common';

export class ScoreRepository extends AbstractRepository<Score> {
  constructor(
    private readonly scoreRepository = AppDataSource.getRepository(Score)
  ) {
    super('Score', scoreRepository);
  }
}
