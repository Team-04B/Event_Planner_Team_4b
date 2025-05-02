import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';
import { ReviewValidations } from '../reviews/reviews.validation';

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
router.post(
  '/:id/reviews',validateRequest(ReviewValidations.createReviewZodSchema),
  ReviewController.createReview
);
router.get(
  '/:id/reviews',
  ReviewController.getAllReviews
);



export const EventRoutes = router;
