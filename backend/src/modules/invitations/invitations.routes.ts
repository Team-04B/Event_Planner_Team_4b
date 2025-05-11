import express from 'express';
import { ReviewController } from '../reviews/reviews.controller';
import { InvitationController } from './invitations.controller';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  auth(Role.ADMIN, Role.USER),
  InvitationController.getMyAllnvitaions
);
router.get(
  '/invitaion/:id',
  auth(Role.ADMIN, Role.USER),
  InvitationController.getSingleInvitaion
);
router.get(
  '/sent-invitaions',
  auth(Role.ADMIN, Role.USER),
  InvitationController.getMySentInvitaions
);

export const InvitationRoutes = router;
