import { Request, Response, NextFunction } from 'express';
import { UpsertScoreDto } from './dto/upsert-score.dto';
import { ScoreService } from './score.service';
import { BadRequestException } from '../../libs/common';
export class ScoreController {
  static async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as UpsertScoreDto;

      return res.status(200).json(await new ScoreService().upsert(payload));
    } catch (error) {
      next(error);
    }
  }

  static async average(req: Request, res: Response, next: NextFunction) {
    try {
      const { osm_id } = req.params;

      if (!osm_id) {
        throw new BadRequestException('required osm_id');
      }

      return res
        .status(200)
        .json(await new ScoreService().averageOfSpecificDistrict(osm_id));
    } catch (error) {
      next(error);
    }
  }
}
