import express, { NextFunction, Request, Response } from 'express';
import { EventController } from './event.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { EventValidations } from './event.validation';
import { ReviewController } from '../reviews/reviews.controller';
import { ReviewValidations } from '../reviews/reviews.validation';
import { InvitationController } from '../invitations/invitations.controller';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';
import { multerUpload } from '../../app/config/multer-config';

const router = express.Router();

//create event
router.post(
  '/',

  auth(Role.USER),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EventValidations.createEventZodSchema),
  EventController.createEvent
);

// get all events

router.get('/all', EventController.getAllEvents);

//get all events by user
router.get(
  '/',
  auth(Role.USER, Role.ADMIN),
  EventController.getAllEventsByUserId
);

// get event by id

router.get(
  '/:id',
  // auth(Role.USER,Role.ADMIN),
  EventController.getEventById
);

// update event
router.patch(
  '/:id',
  auth(Role.USER),
  validateRequest(EventValidations.updateEventZodSchema),
  EventController.updateEvent
);

// delete event from db
router.delete('/:id', auth(Role.USER), EventController.deleteFromDB);

// updateParticipantStatus (PENDING,APPROVED,REJECTED,BANNED)
router.patch(
  '/:id/participants/:participantId/status',
  auth(Role.USER),
  EventController.updateParticipantStatus
);

// Public events
router.post('/:id/join', auth(Role.USER), EventController.handleJoinEvent);

// Private events
router.post(
  '/:id/request',
  auth(Role.USER),
  EventController.handleRequestEvent
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
  '/:id/invite',
  auth(Role.ADMIN, Role.USER),
  InvitationController.createInvitaion
);
router.get(
  '/all-events',
  // auth(Role.ADMIN, Role.USER),
  EventController.getAllEvents
);
router.get('/dashboard-data', auth(Role.USER), EventController.getAllEvents);
router.delete(
  '/admin-delete-event',
  auth(Role.ADMIN),
  EventController.getAllEvents
);

export const EventRoutes = router;
