import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';
import { ReviewValidations } from '../reviews/reviews.validation';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';
import { InvitationController } from '../invitations/invitations.controller';

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

// reviews routes 
router.post(
  '/:id/reviews',
  validateRequest(ReviewValidations.createReviewZodSchema),
  ReviewController.createReview
);
router.get('/:id/reviews', ReviewController.getAllReviews);

// invitaion routes 

router.post(
  '/:id/invite',auth(Role.USER),
  InvitationController.createInvitaion
);

router.delete('/:id', EventController.deleteFromDB);

// approve participant
router.patch(
  '/:id/participants/:participantId/approve',
  EventController.approveParticipant
);

// // reject participant
// router.patch('/:id/participants/:participantId/reject');

// // ban participant
// router.patch('/:id/participants/:participantId/ban');

//join free public event
router.post('/:id/join', EventController.joinPublicEvent);

// Request to join private/paid event
router.post('/:id/request', EventController.joinPaidEvent);

export const EventRoutes = router;
