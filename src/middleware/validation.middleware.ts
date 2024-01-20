import {
  ClassConstructor,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../libs/common';
import { GetMembersFilterDto } from '../api/member/dto/get-members-filter.dto';

export function validationQuery(querySchema: ClassConstructor<unknown>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const query = plainToClass(querySchema, req.query, {
      excludeExtraneousValues: true,
    }) as GetMembersFilterDto;

    const queryErrors = await validate(query as object, {
      whitelist: true,
      stopAtFirstError: true,
    });

    if (queryErrors.length > 0) {
      const message = queryErrors
        .map((error: ValidationError) => `${error.property} : Bad Request`)
        .join(', ');
      next(new BadRequestException(message));
    }

    req.query = { ...query };
    next();
  };
}

export function validationBody(bodySchema: ClassConstructor<unknown>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(bodySchema, req.body, {
      excludeExtraneousValues: true,
    });

    const bodyErrors = await validate(body as object);

    if (bodyErrors.length > 0) {
      const message = bodyErrors
        .map((error: ValidationError) => `${error.property} : Bad Request`)
        .join(', ');
      next(new BadRequestException(message));
    }

    req.body = body;
    next();
  };
}
