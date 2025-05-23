// controllers/activity.controller.ts
import { Request, Response } from 'express';
import { getRecentActivities } from './recentActivity';


export const getRecentActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const activities = await getRecentActivities(limit);
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.error('[Activity Log Controller Error]:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch recent activities' });
  }
};
