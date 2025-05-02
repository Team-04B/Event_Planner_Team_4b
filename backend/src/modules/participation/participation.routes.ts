import express from 'express';
import { ParticipationController } from './participation.controller';

const router = express.Router();

//accept invitation
router.post(
  '/:invitationId/respond',
  ParticipationController.updateParticipantStatus
);

export const ParticipationRoutes = router;
