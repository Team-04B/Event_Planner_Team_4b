import express from 'express';
import { EventController } from './event.controller';

const router = express.Router();

router.post('/', EventController.createEvent);
router.get('/', EventController.getEvents);

export const EventRoutes = router;
