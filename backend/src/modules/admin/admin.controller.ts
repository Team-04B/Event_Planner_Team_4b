
import { Request, Response } from 'express';
import { getEventDistribution } from './admin.service';


export async function getEventDistributionHandler(req: Request, res: Response) {
  try {
    const distribution = await getEventDistribution();
    res.status(200).json(distribution);
  } catch (error) {
    console.error('Error fetching event distribution:', error);
    res.status(500).json({ message: 'Failed to fetch event distribution' });
  }
}

