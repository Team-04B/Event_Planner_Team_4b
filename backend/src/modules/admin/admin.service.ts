import prisma from '../../app/shared/prisma';

export type EventDistributionItem = {
  name: string;
  value: number;
};

export async function getEventDistribution(): Promise<EventDistributionItem[]> {
  const result = await prisma.event.groupBy({
    by: ['isPublic', 'isPaid'],
    _count: { _all: true },
  });

  return result.map((item) => {
    const typeName = item.isPublic ? 'Public' : 'Private';
    const paidName = item.isPaid ? 'Paid' : 'Free';
    return {
      name: `${typeName} ${paidName}`,
      value: item._count._all,
    };
  });
}
