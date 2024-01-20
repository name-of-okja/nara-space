import { NextFunction, Request, Response } from 'express';
import { MemberService } from './member.service';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { CreateMemberDto } from './dto/create-member.dto';

export class MemberController {
  static async findOneByKey(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      const where = Number.isInteger(Number(key))
        ? { id: +key }
        : { nickname: key };
      return res
        .status(200)
        .json(await new MemberService().findOneByKey(where));
    } catch (error) {
      next(error);
    }
  }
  static async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const members = await new MemberService().findByFilter(
        req.query as GetMembersFilterDto
      );

      return res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  }

  static async createMember(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as CreateMemberDto;
      return res.status(201).json(await new MemberService().create(payload));
    } catch (error) {
      next(error);
    }
  }

  static async deleteMemberByKey(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { key } = req.params;
      const where = Number.isInteger(Number(key))
        ? { id: +key }
        : { nickname: key };
      return res.status(200).json(await new MemberService().deleteByKey(where));
    } catch (error) {
      next(error);
    }
  }
}
