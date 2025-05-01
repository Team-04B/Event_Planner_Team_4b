import express from 'express';
import { EventController } from './event.controller';

const router = express.Router();

router.post('/', EventController.createEvent);

export const EventRoutes = router;
