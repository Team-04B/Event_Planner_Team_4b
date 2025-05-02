import express from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';

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
  '/:id/reviews',
  ReviewController.createReview
);



export const EventRoutes = router;
