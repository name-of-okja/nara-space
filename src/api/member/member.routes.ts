import * as express from 'express';
import { MemberController } from './member.controller';

import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { validationBody, validationQuery } from '../../middleware';
import { CreateMemberDto } from './dto/create-member.dto';

const memberRoutes = express.Router();

memberRoutes.get(
  '/',
  validationQuery(GetMembersFilterDto),
  MemberController.getMembers
);

memberRoutes.get(
  '/csv/download',
  validationQuery(GetMembersFilterDto),
  MemberController.downloadCsv
);

memberRoutes.get('/:key', MemberController.findOneByKey);

memberRoutes.post(
  '/',
  validationBody(CreateMemberDto),
  MemberController.createMember
);

memberRoutes.delete('/:key', MemberController.deleteMemberByKey);

export { memberRoutes };
