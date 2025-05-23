// routes/activity.route.ts
import express from 'express';
import { getRecentActivitiesController } from './activity.controller';

const router = express.Router();

router.get('/recent', getRecentActivitiesController);

export const ActivityRoutes = router;
