import express from 'express';
import { getEventDistributionHandler } from './admin.controller';

const router = express.Router();

router.get('/event-distribution', getEventDistributionHandler);

export const AdminRoutes = router;
