import prisma from '../../app/shared/prisma';


export const getRecentActivities = async (limit = 5) => {
  const activities = await prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return activities; 
};
