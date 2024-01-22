import { NextFunction, Request, Response } from 'express';
import { logger } from '../libs/common/logger';
import { EOL } from 'os';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(
    `${EOL}${err.message} ${EOL} Query: ${JSON.stringify(
      req.query,
      null,
      2
    )} ${EOL} Body : ${JSON.stringify(req.body, null, 2)}`
  );
  return res.status(err.statusCode || 500).json({ message: err.message });
}
