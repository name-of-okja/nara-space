import * as express from 'express';
import { memberRoutes } from './member/member.routes';
import { scoreRoutes } from './score/score.routes';

const apiRoutes = express.Router();

apiRoutes.use('/member', memberRoutes);
apiRoutes.use('/score', scoreRoutes);

export default apiRoutes;
