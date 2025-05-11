import express from 'express';
import { ParticipationController } from './participation.controller';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

//respond invitation
router.post(
  '/:invitationId/respond',
  auth(Role.USER),
  ParticipationController.updateParticipantStatus
);

router.get(
  '/:id/participation-status',
  auth(Role.USER),
  ParticipationController.getMyPendingInvitations
);

export const ParticipationRoutes = router;
