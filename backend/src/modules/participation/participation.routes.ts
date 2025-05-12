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

// get pending invitations
router.get(
  '/participation-status',
  auth(Role.USER),
  ParticipationController.getMyPendingInvitations
);


// updateParticipantStatus (PENDING,APPROVED,REJECTED,BANNED)
router.patch(
  '/participants/:participantId/status',
  auth(Role.USER),
  ParticipationController.handleParticipantStatus
);

export const ParticipationRoutes = router;
