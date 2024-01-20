import { Request, Response, NextFunction } from 'express';
import { UpsertScoreDto } from './dto/upsert-score.dto';
import { ScoreService } from './score.service';
export class ScoreController {
  static async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as UpsertScoreDto;
      return res.status(200).json(await new ScoreService().upsert(payload));
    } catch (error) {
      next(error);
    }
  }
}
