
import type { ActivityType, ActivityAction } from '@prisma/client';
import prisma from '../../app/shared/prisma';

export const logActivity = async ({
  type,
  action,
  description,
  userId,
  relatedEntityId,
}: {
  type: ActivityType;
  action: ActivityAction;
  description: string;
  userId?: string;
  relatedEntityId?: string;
}) => {
  try {
    await prisma.activityLog.create({
      data: {
        type,
        action,
        description,
        userId,
        relatedEntityId,
      },
    });
  } catch (error) {
    console.error('Activity Log Error:', error);
  }
};
