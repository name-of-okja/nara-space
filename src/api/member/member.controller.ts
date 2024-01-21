import { NextFunction, Request, Response } from 'express';
import { MemberService } from './member.service';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { plainToInstance } from 'class-transformer';
import { DownloadMemberDto } from './dto/download-member.dto';
import * as json2csv from 'json2csv';
import { EOL } from 'os';
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

  static async downloadCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.query as GetMembersFilterDto;
      const members = await new MemberService().findByFilter(filter);

      const csv = await json2csv.parseAsync(
        plainToInstance(DownloadMemberDto, members, {
          excludeExtraneousValues: true,
        }),
        {
          fields: [
            { label: 'id', value: 'id' },
            { label: '이름', value: 'name' },
            { label: '닉네임', value: 'nickname' },
            { label: '생년월일', value: 'birthday' },
            { label: '등록일', value: 'createdAt' },
          ],
          eol: EOL,
          withBOM: true,
        }
      );

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="' + 'nara-space-' + Date.now() + '.csv"'
      );
      return res.status(200).end(csv);
    } catch (error) {
      next(error);
    }
  }
}
