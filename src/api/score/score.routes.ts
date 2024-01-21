import * as express from 'express';
import { ScoreController } from './score.controller';
import { validationBody } from '../../middleware';
import { UpsertScoreDto } from './dto/upsert-score.dto';

const scoreRoutes = express.Router();

scoreRoutes.post('/', validationBody(UpsertScoreDto), ScoreController.upsert);
scoreRoutes.get('/average/:osm_id', ScoreController.average);
export { scoreRoutes };
