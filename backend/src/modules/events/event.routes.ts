import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  // auth(Role.USER),
  validateRequest(EventValidations.createEventZodSchema),
  EventController.createEvent
);
router.get('/', EventController.getEvents);
router.get('/:id', EventController.getEventById);
router.patch(
  '/:id',
  validateRequest(EventValidations.updateEventZodSchema),
  EventController.updateEvent
);

router.delete('/:id', EventController.deleteFromDB);

// // approve participant
// router.patch('/:id/participants/:participantId/approve');

// // reject participant
// router.patch('/:id/participants/:participantId/reject');

// // ban participant
// router.patch('/:id/participants/:participantId/ban');

//join free public event
router.post('/:id/join', EventController.joinPublicEvent);

// Request to join private/paid event
// router.post('/:id/request', EventController.requestToJoinEvent);

export const EventRoutes = router;
