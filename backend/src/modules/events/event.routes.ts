import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';
import { ReviewValidations } from '../reviews/reviews.validation';
import { InvitationController } from '../invitations/invitations.controller';

const router = express.Router();

router.post(
  '/',
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
  '/:id/reviews',validateRequest(ReviewValidations.createReviewZodSchema),
  ReviewController.createReview
);
router.get(
  '/:id/reviews',
  ReviewController.getAllReviews
);

// invitaion routes 

router.post(
  '/:id/invite',
  InvitationController.createInvitaion
);



export const EventRoutes = router;
