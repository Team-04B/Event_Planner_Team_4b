import express from 'express';
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
router.put(
  '/invitaion/:id/accept',
  auth(Role.ADMIN, Role.USER),
  InvitationController.acceptInvitaion
);
router.put(
  '/invitaion/:id/decline',
  auth(Role.ADMIN, Role.USER),
  InvitationController.declineInvitaion
);
export const InvitationRoutes = router;
