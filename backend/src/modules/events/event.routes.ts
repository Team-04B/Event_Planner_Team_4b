import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';
import { ReviewValidations } from '../reviews/reviews.validation';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

//create event
router.post(
  '/',
  // auth(Role.USER),
  validateRequest(EventValidations.createEventZodSchema),
  EventController.createEvent
);

//get all events
router.get('/', EventController.getEvents);

// get event by id
router.get('/:id', EventController.getEventById);

// update event 
router.patch(
  '/:id',
  validateRequest(EventValidations.updateEventZodSchema),
  EventController.updateEvent
);

// delete event from db
router.delete('/:id', EventController.deleteFromDB);

// updateParticipantStatus (PENDING,APPROVED,REJECTED,BANNED)
router.patch(
  '/:id/participants/:participantId/status',
  EventController.updateParticipantStatus
);

//join free public event
router.post('/:id/join',auth(Role.USER), EventController.joinPublicEvent);

// Request to join private/paid event
router.post('/:id/request', EventController.joinPaidEvent);


router.post(
  '/:id/reviews',
  validateRequest(ReviewValidations.createReviewZodSchema),
  ReviewController.createReview
);
router.get('/:id/reviews', ReviewController.getAllReviews);




export const EventRoutes = router;
