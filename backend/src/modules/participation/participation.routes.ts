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

export const ParticipationRoutes = router;
